import express from "express"
import rutasJikan from "./routes/jikan_routes.mjs"
import rutasAnime from "./routes/anime_routes.mjs"
import rutasUser from "./routes/user_routes.mjs"
import rutasFav from "./routes/fav_routes.mjs"
import rutasChar from "./routes/character_routes.mjs"
import cors from "cors"


const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const cors_config = {
    method : ["POST", "PUT", "GET", "DELETE"],
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001']
 }
app.use(cors(cors_config))
app.use(rutasJikan)
app.use(rutasAnime)
app.use(rutasUser)
app.use(rutasFav)
app.use(rutasChar)


app.listen(PORT, () => console.log("ESCUCHANDO EN", PORT))