import express from "express"
import JikanController from "../controllers/jikan_controller.mjs"


const router = new express.Router()

//Mostrar pags

//Enviar datos al servidor desde formularios/axios
router.get("/jikanAnimeDatabase", JikanController.getAnimebyId)





export default router