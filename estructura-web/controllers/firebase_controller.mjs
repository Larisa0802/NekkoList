import axios from "axios"


class FirebaseController{
    constructor(){
        this.client = axios.create(
            {
                baseURL: "http://localhost:3000"
            }
        )
    }

    signUp = async (req, res) => {
        try{
            const datos = await this.client.post("/signup",
                {
                    email: req.body.email,
                    password: req.body.password
                })
            const datosJson = JSON.parse(datos.config.data)
            res.cookie("cookie",{email: datosJson.email, pass: datosJson.password, uuid: datos.data.user.uid},{expire:2 * 3600 * 100000000000})
            if(datos.status == 200){
                res.render("login.ejs",{log: {email: datosJson.email, pass: datosJson.password, uuid: datos.data.user.uid}})
            }else{
                res.status(404).send("No se han encontrado tareas")
            }
        }catch(error){
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }

    logIn = async (req, res) => {
        try{
            const datos = await this.client.post("/logIn",{
                    email: req.body.email,
                    password: req.body.password
                })
            if(datos.status == 200){
                res.render("logOut.ejs",{log: {uuid: req.cookies.cookie["uuid"]}})
            }else{
                res.status(404).send("No se han encontrado tareas")
            }
        }catch(error){
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }

    signOutUser = async (req, res) => {
        try{
            const datos = await this.client.post("/signOutUser")
            if(datos.status == 200){
                res.send("Sesion Cerrada")
            }else{
                res.status(404).send("No se han encontrado tareas")
            }
        }catch(error){
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }
}

export default new FirebaseController()