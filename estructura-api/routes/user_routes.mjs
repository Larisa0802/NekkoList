import express from "express"
import userController from "../controllers/user_controller.mjs"

const router = new express.Router()


router.get("/getUserData/:id", userController.getUserData)
router.post("/insertUserData", userController.insertUser)
router.post("/updateUser", userController.updateUser)
router.post("/deleteUser", userController.deleteUser)


export default router