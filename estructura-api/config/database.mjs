import {Pool} from "pg"

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME , 
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    max: 20
})

export default pool
