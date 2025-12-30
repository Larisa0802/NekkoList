import express from "express"
import taskController from "../controllers/task_controller.mjs"


const router = new express.Router()

//Mostrar pags
router.get("/catalog", taskController.listar)
router.get("/detalles/:id", taskController.detalle)


export default router