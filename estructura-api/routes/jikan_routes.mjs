import express from "express"
import jikanController from "../controllers/jikan_controller.mjs"

const router = new express.Router()


router.get("/getAnimebyId", jikanController.getAnimebyId)


export default router