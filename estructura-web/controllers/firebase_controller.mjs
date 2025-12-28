import axios from "axios"

class AnimeController {
    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    signUp = async (req, res) => {
        try {
            // JSON que enviamos a la API
            //Poner nombre
            const datosJson = {
                email: req.body.email,
                password: req.body.password,
                nombre: req.body.name
            }

            // Petición a la API
            const datos = await this.client.post("/signup", datosJson)

            if (datos.status === 200) {
                await this.client.post("/insertUserData", {
                    email: datosJson.email,
                    nombre: datosJson.nombre,
                    id: datos.data.user.uid
                })
                res.render("completes/logIn", {
                    log: {
                        email: datosJson.email,
                        pass: datosJson.password,
                        uuid: datos.data.user.uid   // UID devuelto por la API
                    }
                })
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }

    logIn = async (req, res) => {
        try {
            //cambiar estructura para que comprube si la cookie existe para utilizar las llamadas con la info del formulario o de la cookie existente
            const datosJson = {
                email: req.body.email,
                password: req.body.password
            }

            const datos = await this.client.post("/logIn", datosJson)

            if (datos.status === 200) { //Si todo va bien
                // Guardamos cookie con los datos del usuario
                const userData = await this.client.get(`/getUserData/${datos.data.user.uid}`, {
                    id:datos.data.user.uid 
                })
                
                // los datos de la cookie son los que se tienen que usar para mostrar el perfeil y utilizar para las llamadas del pefil
                res.cookie("datosUsuario", {
                    email: datosJson.email,
                    pass: datosJson.password,
                    uuid: datos.data.user.uid,
                    admin: userData.data[0].admin,
                    nombre: userData.data[0].nombre
                }, {
                    expire: 2 * 3600 * 100000000000
                })

                res.render("completes/index", {
                    user: userData.data[0]
                }) 
            }
            else if (datos.status === 400) {
                res.send("Error")
            }
            else {
                res.status(404).send("No se encontro la página")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }

    signOutUser = async (req, res) => {
        try {
            const datos = await this.client.post("/signOutUser")

            if (datos.status === 200) {
                res.render("completes/logIn", { log: "" })
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }
}

export default new AnimeController()
