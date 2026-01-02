import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  verifyBeforeUpdateEmail,
  createUserWithEmailAndPassword, signOut
} from "firebase/auth";

class FirebaseController {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  signUp = async (req, res) => {
    try {
      // JSON que enviamos a la API
      const datosJson = {
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.name,
      };

      // Petición a la API
      const auth = getAuth();
      let userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)

      if(!userCredential){
        res.status(400).send("Error en el registro")
      }else{
        await this.client.post("/insertUserData", {
          email: datosJson.email,
          nombre: datosJson.nombre,
          id: userCredential.user.uid,
        });
        res.render("completes/logIn", {
          log: {
            email: datosJson.email,
            pass: datosJson.password,
            uuid: userCredential.user.uid, // UID devuelto por la API
          },
          user: null,
        });
      }
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al registrarse");
    }
  };

  logIn = async (req, res) => {
    try {

      //cambiar estructura para que comprube si la cookie existe para utilizar las llamadas con la info del formulario o de la cookie existente
      const datosJson = {
        email: req.body.email,
        password: req.body.password,
      };
      const auth = getAuth();
      let userCredential = await signInWithEmailAndPassword(auth,req.body.email, req.body.password)
        if(userCredential._tokenResponse.registered){
          const userData = await this.client.get(
            `/getUserData/${userCredential.user.uid}`
          );
          res.cookie("datosUsuario",
            {
              email: datosJson.email,
              pass: datosJson.password,
              uuid: userCredential.user.uid,
              admin: userData.data[0].admin,
              nombre: userData.data[0].nombre,
            },
            {
              maxAge: 2 * 3600 * 100000000000,
            }
          );

        res.render("completes/index", {
          user: userData.data[0],
        });
        }else{
          res.status(400).send("Error: Email")
        }
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al iniciar sesión");
    }
  };

  //Añadi: Limpiar cookie para que la nav se resetee (no estaba puesto) y redirige al login para que se recargue
  signOutUser = async (req, res) => {
    try {
      const auth = getAuth()
      let userCredential = await signOut(auth)
      res.clearCookie("datosUsuario")
      res.redirect("/login");
      
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al buscar todas las tareas");
    }
  };

  //Comprueba la contraseña a través de la verificación del login, si se le pasa bien la contraseña
  //Actualiza la contraseña antigua a la nueva con updatePassword y actualiza la cookie.
  updatePassword = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"];

      if (!userData) {
        return res.json({ error: "No estas logueado" });
      }


      const auth = getAuth();

      // Re-login para verificar contraseña
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        req.body.oldPass
      );

      const user = userCredential.user;

      await updatePassword(user, req.body.newPass);



      // Actualizar cookie con la nueva contraseña
      res.cookie("datosUsuario", {
        email: userData.email,
        pass: req.body.newPass,
        uuid: userData.uuid,
        admin: userData.admin,
        nombre: userData.nombre,
      });

      res.json({ mensaje: "Contraseña actualizada" });
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al cambiar la contraseña");
    }
  };

  //te deberia devolver a la pagina de datos del usuario; esto se deberia aplicar para todos los updates y delete
  //Comprueba la contraseña a través de la verificación del login, si se le pasa bien la contraseña
  //Actualiza el email antiguo al nuevo con updateEmail y actualiza la cookie.
  updateEmail = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"];
      if (!userData) return res.status(401).json({ error: "No logueado" });

      const auth = getAuth();

      // Login para sesión válida
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        req.body.pass
      );

      const user = userCredential.user;


      const credential = EmailAuthProvider.credential(
        user.email,
        req.body.pass
      );

      await reauthenticateWithCredential(user, credential);

      await verifyBeforeUpdateEmail(user, req.body.newEmail);

      res.cookie("datosUsuario", {
        email: req.body.newEmail,
        pass: userData.pass,
        uuid: userData.uuid,
        admin: userData.admin,
        nombre: userData.nombre,
      });

      res.json({ mensaje: "Email actualizado correctamente" });
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al cambiar el email");
    }
  };

  getProfile = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"];

      if (!userData) {
        return res.redirect("/logIn");
      }

      res.render("completes/profile", {
        user: userData,
      });
      
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Error al cargar el perfil");
    }
  };
}

export default new FirebaseController();
