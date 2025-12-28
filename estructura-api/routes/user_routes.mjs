import express from "express"
import userController from "../controllers/user_controller.mjs"

const router = new express.Router()


router.get("/getUserData/:id", userController.getUserData)
router.post("/insertUserData", userController.insertUser)


export default router