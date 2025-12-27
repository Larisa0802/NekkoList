import pool from "../config/database.mjs"
import { Anime } from "../models/anime_model.mjs"


async function insertAnime(arrayData){
    const client = await pool.connect()
    let result = ""
    try{
        for(let i = 0; i < arrayData.length; i++){
            //datos a guardar en db anime.id; anime.title.english; anime.genres[].name; anime.synopsis; anime.episodes; anime.airInfo.airedFrom
            let date = new Date(arrayData[i].airInfo.airedFrom)
            await client.query(`INSERT INTO animes (id,titulo,genero,descripcion,episodios,fecha_pub,imagen) VALUES (${arrayData[i].id}, '${titleChecker(arrayData[i].title)}', '${genreConstructor(arrayData[i].genres)}', '${arrayData[i].synopsis.replaceAll("[Written by MAL Rewrite]", "").replaceAll("\'","").replaceAll("\"","")}', ${arrayData[i].episodes}, '${date.toISOString()}', '${imageChecker(arrayData[i].image)}') ON CONFLICT (id) DO NOTHING;`)
        }
       
    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
    }
    return result
}

async function selectAllAnime(){
    const client = await pool.connect()
    let result = ""
    let anime = undefined
    try{
        result = await client.query(`SELECT * from animes;`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        anime = result.rows.map((e) => new Anime(e))
    }
    return anime
}

async function selectAnimeById(id){
    const client = await pool.connect()
    let result = ""
    let anime = undefined
    try{
        result = await client.query(`SELECT * from animes where id = ${id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        anime = result.rows.map((e) => new Anime(e))
    }
    return anime
}


// revisar bien como se quiere hacer
async function updateAnimeById(id, column, value){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE animes set ${column} = ${value} where id = ${id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

async function deleteAnimeById(id){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`DELETE FROM animes where id = ${id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

function genreConstructor(genres){
    let genero = ""
    for(let i = 0; i < genres.length; i++){
        if(i == genres.length -1){
            genero += ` ${genres[i].name}`
        }else{
            genero += `${genres[i].name}, `
        }
    }
    return genero
}

function imageChecker(imageObject){
    let image = ""
    if(imageObject.webp){
        return imageObject.webp.default
    }else if(imageObject.jpeg){
        return imageObject.jpeg.default
    }else if(imageObject.jpg){
        return imageObject.jpg.default
    }
    return image
}

function titleChecker(titleObject){
    let title = ""
    if(titleObject.english){
        return titleObject.english.replaceAll("\'","").replaceAll("\"","")
    }else if(titleObject.japanese){
        return titleObject.japanese.replaceAll("\'","").replaceAll("\"","")
    }
    return title
}



export default {
    insertAnime,
    selectAllAnime,
    selectAnimeById,
    updateAnimeById,
    deleteAnimeById
}
