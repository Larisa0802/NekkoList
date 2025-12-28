import pool from "../config/database.mjs"
import { Favourites } from "../models/fav_model.mjs"

// data{
//      userId: 'asd',
//      animeId: 12 
// }
async function insertFavorite(data){
    const client = await pool.connect()
    let result = ""
    try{
        await client.query(`INSERT INTO Favoritos (usuario_id,anime_id) VALUES ('${data.userId}',${data.animeId}) ON CONFLICT (id) DO NOTHING;`)
       
    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
    }
    return result
}


// mostrar todos los datos de los animes mas el rating
async function selectAllFavourites(usuario_id){
    const client = await pool.connect()
    let result = ""
    let favoritos = undefined
    try{
        result = await client.query(`SELECT * from favoritos where usuario_id = '${usuario_id}';`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        favoritos = result.rows.map((e) => new Favourites(e))
    }
    return favoritos
}

async function updateFavouriteById(usuario_id, anime_id, value){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE favoritos set progreso = ${value} where usuario_id = '${usuario_id}' and anime_id = ${anime_id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

async function deleteFavouriteById(usuario_id, anime_id){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`DELETE FROM favoritos where usuario_id = '${usuario_id}' and anime_id = ${anime_id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

export default {
    insertFavorite,
    selectAllFavourites,
    updateFavouriteById,
    deleteFavouriteById
}