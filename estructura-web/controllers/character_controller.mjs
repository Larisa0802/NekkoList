import axios from "axios"

class CharController {
    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:3000"
        })
    }
    //este metodo deberia ir junto con el de actualizar anime
    updateVAInfo = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.post("/updateCharacterVA",{
                //mirar como recoger el id del anime cuando se vayan a actualizar los datos de los animes
                info:req.body.nameVA,
                // animeId:
            })
            if (datos.status === 200) {
                res.redirect("/profile")
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }
    //te deberia devolver a la pagina de favoritos o donde se vaya a modificar los actores de voz del anime; esto se deberia aplicar para todos los updates y delete
    //este metodo deberia ir junto con el de eliminar anime
    DeleteInfo = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.get(`/deleteInfo/${animeId}`)
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
    deleteCharById = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.get(`/deleteChar/${idChar}`)
            if (datos.status === 200) {
                res.redirect("/profile")
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }
}

export default new CharController()
