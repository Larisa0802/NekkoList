import express from "express"
import rutasTask from "./routes/task_routes.mjs"
import cors from "cors"
import { initializeApp } from "firebase/app";





const PORT = 3000
const app = express()

const firebaseConfig = {
  apiKey:  process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
const firebase = initializeApp(firebaseConfig);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const cors_config = {
    method : ["POST", "PUT", "GET", "DELETE"],
    origin: 'http://127.0.0.1:3001'
 }
app.use(cors(cors_config))
app.use(rutasTask)


app.listen(PORT, () => console.log("ESCUCHANDO EN", PORT))