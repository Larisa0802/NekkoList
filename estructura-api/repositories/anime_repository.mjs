import pool from "../config/database.mjs"
import { Anime } from "../models/anime_model.mjs"

async function insertAnimeJikan(arrayData){
    const client = await pool.connect()
    let result = ""
    try{
        for(let i = 0; i < arrayData.length; i++){
            //datos a guardar en db anime.id; anime.title.english; anime.genres[].name; anime.synopsis; anime.episodes; anime.airInfo.airedFrom
            let date = new Date(arrayData[i].airInfo.airedFrom)
            await client.query(`INSERT INTO animes (id,titulo,genero,descripcion,episodios,fecha_pub,imagen) VALUES (${arrayData[i].id}, '${titleChecker(arrayData[i].title)}', '${genreConstructor(arrayData[i])}', '${arrayData[i].synopsis.replaceAll("[Written by MAL Rewrite]", "").replaceAll("\'","").replaceAll("\"","")}', ${arrayData[i].episodes}, '${date.toISOString()}', '${imageChecker(arrayData[i].image)}') ON CONFLICT (id) DO NOTHING;`)
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


// solo se envia un solo objeto a modificar en un objeto json dentro de la pagina con el id especifico
async function updateAnimeById(animeData){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE animes set titulo = '${animeData.titulo}', genero = '${animeData.genero}', descripcion = '${animeData.descripcion}', episodios = ${episodeChecker(animeData.episodios)}, fecha_pub = '${animeData.fecha_pub}', imagen = '${animeData.imagen}' where id = ${animeData.id};`)

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
// generos en blanco si no existen se deben contatenar los temas
function genreConstructor(data){
    let genero = ""
    if(data.genres.length > 0){
        for(let i = 0; i < data.genres.length; i++){
            if(i == data.genres.length -1){
                genero += ` ${data.genres[i].name}`
            }else{
                genero += `${data.genres[i].name}, `
            }
        }
    }else{
        for(let i = 0; i < data.themes.length; i++){
            if(i == data.themes.length -1){
                genero += ` ${data.themes[i].name}`
            }else{
                genero += `${data.themes[i].name}, `
            }
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

function episodeChecker(episodes){
    if(isNaN(Number(episodes))){
        return episodes
    }else{
        return null
    }

}

async function selectAnimeFollowedStat(){
    const client = await pool.connect()
    let result = ""
    let anime = undefined
    try{
        result = await client.query(`select count(animes.id), animes.titulo from animes join favoritos on (favoritos.anime_id = animes.id) group by favoritos.anime_id,animes.titulo order by count DESC limit 5;`)
    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        console.log(result.rows)
        anime = result.rows
      
    }
    return anime
}



export default {
    insertAnimeJikan,
    selectAllAnime,
    selectAnimeById,
    updateAnimeById,
    deleteAnimeById,
    selectAnimeFollowedStat
}
