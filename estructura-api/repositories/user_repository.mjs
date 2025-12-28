import pool from "../config/database.mjs"
import { User } from "../models/user_model.mjs"

async function insertUser(data){
    const client = await pool.connect()
    let result = ""
    try{
        await client.query(`INSERT INTO usuarios (id,email,nombre) VALUES ('${data.id}', '${data.email}','${data.nombre}') ON CONFLICT (id) DO NOTHING;`)
       
    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
    }
    return result
}

async function selectUser(){
    const client = await pool.connect()
    let result = ""
    let user = undefined
    try{
        result = await client.query(`SELECT * from usuarios;`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        user = result.rows.map((e) => new User(e))
    }
    return user
}


async function selectUserById(id){
    const client = await pool.connect()
    let result = ""
    let user = undefined
    try{
        result = await client.query(`SELECT * from usuarios where id = '${id}';`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        user = result.rows.map((e) => new User(e))
    }
    return user
}

// se envian todos los campos de un a vez al ser modificados
// data = {
//     email = asd,
//     nombre = asd,
//     id = asd
// }
async function updateUserById(userData){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE usuarios set email = ${userData.email}, nombre = ${userData.nombre} where id = '${userData.id}';`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

async function deleteUserById(id){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`DELETE FROM usuarios where id = '${id}';`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}



export default {
    insertUser,
    selectUser,
    selectUserById,
    updateUserById,
    deleteUserById
}