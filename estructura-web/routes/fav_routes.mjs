import express from "express"
import favController from "../controllers/fav_controller.mjs"


const router = new express.Router()

//Mostrar pags
router.get("/favoritos", favController.getAllFav)
router.get("/insertFav/:userId&:animeId", favController.insertFav)
//Enviar datos al servidor desde formularios/axios
router.get("/deleteFav/:userId&:animeId", favController.deleteFav)

router.post("/updateFav", favController.updateFav)





export default router