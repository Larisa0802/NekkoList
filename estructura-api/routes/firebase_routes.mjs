import express from "express"
import firebaseController from "../controllers/firebase_controller.mjs"

const router = new express.Router()


router.post("/signup", firebaseController.signUp)
router.post("/logIn", firebaseController.logIn)
router.post("/signOutUser", firebaseController.signOutUser)


export default router