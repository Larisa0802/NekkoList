import pool from "../config/database.mjs"
import { Favourites } from "../models/fav_model.mjs"
import { Anime } from "../models/anime_model.mjs"

// data{
//      userId: 'asd',
//      animeId: 12 
// }
async function insertFavorite(data){
    const client = await pool.connect()
    let result = ""
    try{
        await client.query(`INSERT INTO favoritos (usuario_id,anime_id) VALUES ('${data.userId}',${data.animeId}) ON CONFLICT (anime_id, usuario_id) DO NOTHING;`)
       
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
    let arrayFavoritos = []
    try{
        result = await client.query(`SELECT favoritos.usuario_Id, animes.id, favoritos.fecha_agregado, favoritos.rating, animes.titulo, animes.genero, animes.descripcion, animes.episodios, animes.fecha_pub, animes.imagen from animes join favoritos on (favoritos.anime_id = animes.id) where favoritos.usuario_id = '${usuario_id}';`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        for(let i = 0; i < result.rows.length; i++){
            favoritos = new Favourites({
                usuario_id: result.rows[i].usuario_id,
                anime_id: result.rows[i].id,
                fecha_agregado: result.rows[i].fecha_agregado,
                rating: result.rows[i].rating,
                animeData: new Anime({
                    id: result.rows[i].id, 
                    titulo: result.rows[i].titulo, 
                    genero: result.rows[i].genero,
                    descripcion: result.rows[i].descripcion,
                    episodios: result.rows[i].episodios,
                    fecha_pub: result.rows[i].fecha_pub,
                    imagen: result.rows[i].imagen
                })
            })
            arrayFavoritos.push(favoritos)
        }     
    }
    return arrayFavoritos
}

async function updateFavouriteById(favData){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE favoritos set rating = ${favData.rating} where usuario_id = '${favData.usuario_id}' and anime_id = ${favData.anime_id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

async function deleteFavouriteById(favData){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`DELETE FROM favoritos where usuario_id = '${favData.usuario_id}' and anime_id = ${favData.anime_id};`)

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