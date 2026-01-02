import axios from "axios"

class FavController {
    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    //buscar una mejor manera de como mandar los datos para que no se envien mediante la url
    insertFav = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.get(`/insertFav/${req.cookies["datosUsuario"].uuid}&${req.params.animeId}`)
            if (datos.status === 200) {
                res.sendStatus(200)
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }
    //te deberia devolver a la pagina de favoritos o donde se vaya a modificar el rating del anime; esto se deberia aplicar para todos los updates y delete
    updateFav = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.post("/updateFav")
            if (datos.status === 200) {
                res.render("completes/", {
                    
                })
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }
    //te deberia devolver a la pagina de favoritos; esto se deberia aplicar para todos los updates y delete
    deleteFav = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.get(`/deleteFav/${req.cookies["datosUsuario"].uuid}&${req.params.animeId}`)
            if (datos.status === 200) {
                res.render("completes/", {
                    
                })
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }

    getAllFav = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.get(`/getAllFav/${req.cookies["datosUsuario"].uuid}`)
            if (datos.status === 200) {
                res.render("completes/profile", {
                    favData: datos.data,
                    user: req.cookies["datosUsuario"].uuid 
                })
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }
}

export default new FavController()
