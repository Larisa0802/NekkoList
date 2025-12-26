import axios from "axios"

class JikanController {
    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    getAnimebyId = async (req, res) => {
        try {
            // Petición a la API
            const datos = await this.client.get("/getAnimebyId")
            console.log(datos.data)
            if (datos.status === 200) {
                res.render("completes/animeListPruebas", {
                    animeData: datos.data
                })
            } else {
                res.status(404).send("No se han encontrado tareas")
            }

        } catch (error) {
            console.error("Error al consumir la API:", error.message)
            res.status(500).send("Error al buscar todas las tareas")
        }
    }

    // getAnimebyName = async (req, res) => {
    //     try {

    //         const datos = await this.client.get("/getAnimebyName")

    //         if (datos.status === 200) { //Si todo va bien

    //             // Guardamos cookie con los datos del usuario
    //             res.render("completes/asd2", { animeData: datos.data
    //             }) 
    //         }
    //         else if (datos.status === 400) {
    //             res.send("Error")
    //         }
    //         else {
    //             res.status(404).send("No se encontro la página")
    //         }

    //     } catch (error) {
    //         console.error("Error al consumir la API:", error.message)
    //         res.status(500).send("Error al buscar todas las tareas")
    //     }
    // }
}

export default new JikanController()
