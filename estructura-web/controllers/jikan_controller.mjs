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
            const datos = await this.client.get("/jikanAnimeDatabase")
            console.log(datos.data)
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
}

export default new JikanController()
