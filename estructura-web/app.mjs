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
app.use(cookieParser())

//Comprueba que exista la cookie, que no este vacia o corrupta, si no vale es null y si vale continua.
app.use((req, res, next) => {
  let user = req.cookies["datosUsuario"];

  // Si no existe o está vacía
  if (!user || user === "null" || user === "undefined") {
    res.locals.user = null;
    return next();
  }

  // Si viene como string, intentar parsearla
  if (typeof user === "string") {
    try {
      user = JSON.parse(user);
    } catch (e) {
      user = null;
    }
  }

  //Si es un objeto vacio es null
  if (!user || typeof user !== "object") {
    res.locals.user = null;
    return next();
  }

  res.locals.user = user;
  next();
});


function isAdmin(req,res,next){
  const user = req.cookies.datosUsuario

  if(!user || user.admin !== true){
    return res.status(403).render("completes/accessDenied")
  }

  next()
}

app.get("/", (req,res) => {
  res.render("completes/index")
})
app.get("/admin", isAdmin, (req,res) => {
  res.render("completes/admin")
})

app.set("view engine", "ejs")
app.set("views", path.join(actualRoute,"views"))
app.use(express.static(path.join(actualRoute,"public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(firebaseRoutes)
app.use(jikanRoutes)
app.use(animeRoutes)
app.use(favRoutes)


//escucha
app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en ${PORT}`)
})
