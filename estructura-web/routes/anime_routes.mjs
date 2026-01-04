import express from "express"
import taskController from "../controllers/task_controller.mjs"


const router = new express.Router()

//Mostrar pags
router.get("/catalog", taskController.listar)
router.get("/detalles/:id", taskController.detalle)


router.post("/update", async(req, res) => {
    if(!req.session.user || req.session.user.rol !== "admin"){
        return res.redirect("/accessDenied");
    }

    const { id, titulo, genero, episodios, descripcion } = req.body;
    const consulta = `
        UPDATE animes
        SET titulo = ?, genero = ?, episodios = ?, descripcion = ?
        WHERE id = ?
    `;

    await db.query(consulta, [titulo, genero, episodios, descripcion, id])

    res.redirect("/catalog")
})


export default router