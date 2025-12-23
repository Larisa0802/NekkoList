//COMO APUNTE, IGNORAR.

import axios from "axios"

class AnimeController {
    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:3000"  
        })
    }

    // LISTAR ANIMES
    listar = async (req, res) => {
        try {
            //Envia un GET a la API y espera respuesta
            const respuesta = await this.client.get("/animes")
            const animes = respuesta.data //Respuesta de la api

            //Renderizado en la página de catalogo con la información de la variable animes
            res.render("completes/catalogo", {
                title: "Catalogo",
                animes,
                user: req.session.user || null
            })

        } catch (error) {
            console.error("Error al obtener animes:", error.message)

            res.render("completes/catalogo", {
                title: "Catálogo",
                animes: [],
                error: "No se pudo cargar el catálogo",
                user: req.session.user || null
            })
        }
    }

    // DETALLE DE UN ANIME
    detalle = async (req, res) => {
        const { id } = req.params
        try {
            const respuesta = await this.client.get(`/animes/${id}`)
            const anime = respuesta.data

            res.render("completes/detalle", {
                title: anime.titulo,
                anime,
                user: req.session.user || null
            })

        } catch (error) {
            res.status(404).render("completes/not_found", {
                title: "Anime no encontrado",
                user: req.session.user || null
            })
        }
    }
}

export default new AnimeController()
