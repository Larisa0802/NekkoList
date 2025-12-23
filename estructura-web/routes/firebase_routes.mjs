import express from "express"
import AnimeController from "../controllers/firebase_controller.mjs"


const router = new express.Router()

//Mostrar pags
router.get("/login", (req, res) => {
    res.render("completes/logIn", { log: {} })
})
router.get("/register", (req, res) => {
    res.render("completes/register")
})
router.get("/logOut", (req, res) => {
  res.render("completes/logOut")
})
router.get("/contact", (req, res) => {
  res.render("completes/contact") 
})
router.get("/catalog", (req, res) => {
  res.render("completes/catalog") 
})
router.get("/inicio", (req, res) => {
  res.render("completes/index") 
})

//Enviar datos al servidor desde formularios/axios
router.post("/signUp", AnimeController.signUp)
router.post("/logIn", AnimeController.logIn)
router.post("/signOutUser", AnimeController.signOutUser)



export default router