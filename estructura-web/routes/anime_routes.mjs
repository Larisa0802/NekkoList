import express from "express"
import taskController from "../controllers/task_controller.mjs"
import animeController from "../controllers/anime_controllerW.mjs"

const router = new express.Router()

//Mostrar pags
router.get("/catalog", taskController.listar)
router.get("/anime/:id", taskController.detalle);
router.post("/update", animeController.updateAnime);


export default router