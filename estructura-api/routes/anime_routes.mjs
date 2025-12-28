import express from "express"
import animeController from "../controllers/anime_controller.mjs"

const router = new express.Router()


router.get("/getAllAnimes", animeController.getAllAnimes)
router.get("/getAnimeById", animeController.getAnimeById)


export default router