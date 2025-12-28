import express from "express"
import path from "path"
import firebaseRoutes from "./routes/firebase_routes.mjs"
import jikanRoutes from "./routes/jikan_routes.mjs"
import animeRoutes from "./routes/anime_routes.mjs"
import favRoutes from "./routes/fav_routes.mjs"
import cookieParser from "cookie-parser" //npm i cookie-parser


//inicializacion del server
const PORT = 3001
const app = express()
const actualRoute = path.resolve(".")


//middleware
app.set("view engine", "ejs")
app.set("views", path.join(actualRoute,"views"))
app.use(express.static(path.join(actualRoute,"public")))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(firebaseRoutes)
app.use(jikanRoutes)
app.use(animeRoutes)
app.use(favRoutes)


//escucha
app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en ${PORT}`)
})
