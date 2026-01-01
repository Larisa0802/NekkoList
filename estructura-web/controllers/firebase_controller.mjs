import axios from "axios";

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
      const datos = await this.client.post("/signup", datosJson);

      if (datos.status === 200) {
        await this.client.post("/insertUserData", {
          email: datosJson.email,
          nombre: datosJson.nombre,
          id: datos.data.user.uid,
        });
        res.render("completes/logIn", {
          log: {
            email: datosJson.email,
            pass: datosJson.password,
            uuid: datos.data.user.uid, // UID devuelto por la API
          },
          user: null,
        });
      } else {
        res.status(404).send("Error en el registro");
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

      const datos = await this.client.post("/logIn", datosJson);

      if (datos.status === 200) {
        const userData = await this.client.get(
          `/getUserData/${datos.data.user.uid}`
        );

        // los datos de la cookie son los que se tienen que usar para mostrar el perfeil y utilizar para las llamadas del pefil
        res.cookie(
          "datosUsuario",
          {
            email: datosJson.email,
            pass: datosJson.password,
            uuid: datos.data.user.uid,
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
      } else if (datos.status === 400) {
        res.status(400).send("Error: Email");
      } else {
        res.status(404).send("No se encontro la página");
      }
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al iniciar sesión");
    }
  };

  //Añadi: Limpiar cookie para que la nav se resetee (no estaba puesto) y redirige al login para que se recargue
  signOutUser = async (req, res) => {
    try {
      const datos = await this.client.post("/signOutUser");

      if (datos.status === 200) {
        res.clearCookie("datosUsuario");
        res.redirect("/login");
      } else {
        res.status(404).send("No se han encontrado tareas");
      }
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

      const verificar = await this.client.post("/logIn", {
        email: userData.email,
        password: req.body.oldPass,
      });

      //Si hay algun error
      if (!verificar.data.user) {
        return res
          .status(400)
          .json({ error: "La contraseña antigua es incorrecta" });
      }

      const datos = await this.client.post("/updatePassword", {
        password: req.body.newPass,
      });

      // Actualizar cookie con la nueva contraseña
      if (datos.status === 200) {
        res.cookie("datosUsuario", {
          email: userData.email,
          pass: req.body.newPass,
          uuid: userData.uuid,
          admin: userData.admin,
          nombre: userData.nombre,
        });

        res.json({ mensaje: "Contraseña actualizada" });
      } else {
        res.status(404).json({ error: "Error al actualizar" });
      }
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al cambiar la contraseña");
    }
  };

  //Comprueba la contraseña a través de la verificación del login, si se le pasa bien la contraseña
  //Actualiza el email antiguo al nuevo con updateEmail y actualiza la cookie.
  updateEmail = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"]; //Recoger la cookie

      if (!userData) {
        //Comprobar si el usuario esta logueado
        return res.json({ error: "No estás logueado" });
      }

      //Verificar contraseña antigua para permitir el cambio de email
      const verificar = await this.client.post("/logIn", {
        email: userData.email,
        password: req.body.oldPass,
      });

      //Si el login falla la contraseña antigua es incorrecta
      if (!verificar.data.user) {
        return res
          .status(400)
          .json({ error: "La contraseña antigua es incorrecta" });
      }

      //Cambiar email
      const datos = await this.client.post("/updateEmail", {
        email: req.body.newEmail,
      });

      if (datos.status === 200) {
        //Actualizar cookie
        res.cookie("datosUsuario", {
          email: req.body.newEmail,
          pass: userData.pass,
          uuid: userData.uuid,
          admin: userData.admin,
          nombre: userData.nombre,
        });

        res.json({ mensaje: "Email actualizado correctamente" });
      } else {
        res.status(404).json({ error: "Error al actualizar el email" });
      }
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
      res.status(500).send("Error al cambiar el email");
    }
  };

  //Obtener favoritos e info del usuario desde la API
  getProfile = async (req, res) => {
    try {
      const userData = req.cookies["datosUsuario"];

      if (!userData) {
        return res.redirect("/logIn");
      }

      const favResponse = await this.client.get(`/getAllFav/${userData.uuid}`);

      //Comprueba que favData siempre exista
      const favData = favResponse.data || [];

      res.render("completes/profile", {
        user: userData,
        favData: favData,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Error al cargar el perfil");
    }
  };
}

export default new FirebaseController();
