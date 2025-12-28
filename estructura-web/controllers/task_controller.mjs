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
            const respuesta = await this.client.get("/getAllAnimes")
            const animes = respuesta.data //Respuesta de la api

            if(respuesta.status == 200){
                //Renderizado en la página de catalogo con la información de la variable animes
                res.render("completes/catalog", {
                    title: "Catalogo",
                    animes: animes,
                    user: req.cookies["datosUsuario"]?.uuid || null
                })
            }else{
                res.render("completes/catalog", {
                    title: "Catálogo",
                    animes: [],
                    error: "No se pudo cargar el catálogo",
                    user: req.cookies["datosUsuario"]?.uuid || null
                })
            }
            
            

        } catch (error) {
            console.error("Error al obtener animes:", error.message)

            res.render("completes/catalogo", {
                title: "Catálogo",
                animes: [],
                error: "No se pudo cargar el catálogo",
                user: req.cookies["datosUsuario"]?.uuid || null
            })
        }
    }

    // DETALLE DE UN ANIME
    detalle = async (req, res) => {
        const { id } = req.params
        try {
            const respuesta = await this.client.get(`/getAnimeById/${id}`)
            const anime = respuesta.data

            res.render("completes/detalle", {
                title: anime.titulo,
                anime:anime,
                user: req.cookies["datosUsuario"]?.uuid || null
            })

        } catch (error) {
            res.status(404).render("completes/not_found", {
                title: "Anime no encontrado",
                user: req.cookies["datosUsuario"]?.uuid || null
            })
        }
    }
}

export default new AnimeController()
