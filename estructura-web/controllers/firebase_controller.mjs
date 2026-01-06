import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  verifyBeforeUpdateEmail,
  createUserWithEmailAndPassword,
  signOut,
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
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password
      );

      if (userCredential) {
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
          errorL: null,
        });
      } else {
        res.status(400).send("Error en el registro");
      }
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.render("completes/register", {
        error: {
          mensaje: "Error al registrarse (email en uso)",
        },
      });
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
      let userCredential = await signInWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password
      );

      if (userCredential && userCredential.user) {
        const userData = await this.client.get(
          `/getUserData/${userCredential.user.uid}`
        );
        res.cookie(
          "datosUsuario",
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

        // tiene como atributos rankingAnimeFav.count y rankingAnimeFav.titulo
        let rankingAnimeFav = await this.client.post("/getAnimeFollowStat");

        // tiene como atributos rankingUserFav.count y rankingUserFav.nombre
        let rankingUserFav = await this.client.post("/getUserFollowStat");

        if (!rankingAnimeFav || !rankingAnimeFav.data) {
          console.log("No se pudo obtener el ranking de animes favoritos");
        }

        if (!rankingUserFav || !rankingUserFav.data) {
          console.log(
            "No se pudo obtener el ranking de usuarios con mas favoritos"
          );
        }

        console.log("rankingAnimeFav:", rankingAnimeFav.data);
        console.log("rankingUserFav:", rankingUserFav.data);

        res.render("completes/index", {
          user: userData.data[0],
          rankingAnimeFav: rankingAnimeFav.data,
          rankingUserFav: rankingUserFav.data,
        });
      } else {
        res.status(400).send("Error: Email");
      }
    } catch (error) {
      console.error("Error al consumir la API:", error.message);

      res.render("completes/logIn", {
        errorL: { mensaje: "Error al iniciar sesión" },
        log: { email: req.body.email, pass: req.body.password },
      });
    }
  };

  //Añadi: Limpiar cookie para que la nav se resetee (no estaba puesto) y redirige al login para que se recargue
  signOutUser = async (req, res) => {
    try {
      const auth = getAuth();
      let userCredential = await signOut(auth);
      res.clearCookie("datosUsuario");
      res.redirect("/login");
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.render("completes/logOut", {
        error: {
          mensaje: "Error al cerrar sesión",
        },
      });
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
      if(error.code === "auth/invalid-credential"){
            return res.status(400).json({ error: "Contraseña incorrecta" });
      }
      console.error("Error al consumir la API:", error.message);
    }
  };

  //Comprueba la contraseña a través de la verificación del login, si se le pasa bien la contraseña
  //Actualiza el email antiguo al nuevo con updateEmail y actualiza la cookie.
  updateEmail = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"];
      if (!userData) return res.status(401).json({ error: "No logueado" });

      const auth = getAuth();

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

      return res.json({
        mensaje:
          "Revisa tu bandeja de entrada o spam que te hemos enviado en tu nuevo correo electrónico para confirmar el cambio de email",
      });
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/invalid-login-credentials" ||
        error.code === "auth/wrong-password"
      ) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      return res.status(400).json({ error: "Error al cambiar el email" });
    }
  };

  updateName = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"];
      if (!userData) return res.status(401).json({ error: "No logueado" });
      let datos = await this.client.post("/updateUserName", {
        id: userData.uuid,
        nombre: req.body.newName,
      });

      res.cookie("datosUsuario", {
        email: userData.email,
        pass: userData.pass,
        uuid: userData.uuid,
        admin: userData.admin,
        nombre: req.body.newName,
      });

      res.json({ mensaje: "Nombre actualizado correctamente" });
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.render("completes/changeName", {
        error: {
          mensaje: "Error al cambiar el nombre",
        },
      });
    }
  };

  getProfile = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"];

      if (!userData) {
        return res.redirect("/logIn");
      }

      const datos = await this.client.get(
        `/getAllFav/${req.cookies["datosUsuario"].uuid}`
      );
      res.render("completes/profile", {
        favData: datos.data,
        user: userData,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.render("completes/profile", {
        error: {
          mensaje: "Error al cargar el perfil",
        },
      });
    }
  };
}

export default new FirebaseController();
