import express from "express"
import animeController from "../controllers/anime_controller.mjs"

const router = new express.Router()


router.get("/getAllAnimes", animeController.getAllAnimes)
router.get("/getAnimeById/:id", animeController.getAnimeById)
router.post("/deleteAnime", animeController.deleteAnime)
router.post("/updateAnime", animeController.updateAnime)
router.get("/getAnimeFollowStat", animeController.getAnimeFollowStat)



export default router