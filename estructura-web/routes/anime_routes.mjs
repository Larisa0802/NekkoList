import express from "express"
import taskController from "../controllers/task_controller.mjs"


const router = new express.Router()

//Mostrar pags

//Enviar datos al servidor desde formularios/axios
router.get("/catalogo", taskController.listar)
router.get("/detalles/:id", taskController.listar)





export default router