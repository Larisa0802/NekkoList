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

async function selectUserByEmail(email){
    const client = await pool.connect()
    let result = ""
    let user = undefined
    try{
        result = await client.query(`SELECT * from usuarios where email = '${email}';`)

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
//     id = asd
// }
async function updateUserEmailById(userData){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE usuarios set email = '${userData.email}' where id = '${userData.id}';`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

// se envian todos los campos de un a vez al ser modificados
// data = {
//     nombre = asd,
//     id = asd
// }
async function updateUserNameById(userData){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE usuarios set nombre = '${userData.nombre}' where id = '${userData.id}';`)

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

async function selectUserFollowedStat(){
    const client = await pool.connect()
    let result = ""
    let user = undefined
    try{
        result = await client.query(`select count(favoritos.anime_id), usuarios.nombre from usuarios join favoritos on (favoritos.usuario_id = usuarios.id) group by favoritos.usuario_id, usuarios.nombre order by count DESC limit 5;`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        console.log(result.rows)
        user = result.rows
      
    }
    return user
}



export default {
    insertUser,
    selectUser,
    selectUserById,
    updateUserEmailById,
    updateUserNameById,
    deleteUserById,
    selectUserFollowedStat,
    selectUserByEmail
}