import express from "express"
import taskController from "../controllers/task_controller.mjs"


const router = new express.Router()

//Mostrar pags
router.get("/catalogo", taskController.listar)
router.get("/detalles/:id", taskController.detalle)
//Enviar datos al servidor desde formularios/axios






export default router