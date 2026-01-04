import express from "express"
import charController from "../controllers/characters_controller.mjs"

const router = new express.Router()


router.get("/getAllCharacters/:id", charController.getCharByAnime)
router.post("/updateCharacterVA", charController.updateCharVA)
router.get("/deleteChar/:id", charController.deleteCharById)
router.get("/deleteInfo/:id", charController.deleteCharInfo)



export default router