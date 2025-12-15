import express from "express"
import FirebaseController from "../controllers/firebase_controller.mjs"


const router = new express.Router()

router.post("/signup", FirebaseController.signUp)
router.post("/logIn", FirebaseController.logIn)
router.post("/signOutUser", FirebaseController.signOutUser)

export default router