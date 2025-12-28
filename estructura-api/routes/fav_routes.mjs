import express from "express"
import favController from "../controllers/fav_controller.mjs"

const router = new express.Router()


router.get("/getAllFav/:id", favController.getAllFav)
router.get("/deleteFav/:userId&:animeId", favController.deleteFavourite)
router.get("/insertFav/:userId&:animeId", favController.setFavourite)
router.post("/updateFav", favController.updateFavourite)


export default router