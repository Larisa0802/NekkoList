import pool from "../config/database.mjs"
import { Characters } from "../models/characters_model.mjs"

async function insertCharJikan(arrayData){
    const client = await pool.connect()
    let result = ""
    try{
        
        for(let i = 0; i < arrayData.length; i++){
            for(let j = 0; j < arrayData[i].char.length; j++){
                if(arrayData[i].char[j].role == "Main"){
                    console.log(arrayData[i].char[j].character)
                  
                    await client.query(`INSERT INTO personajes (id,anime_id,name,role,voice_actor,character_img) VALUES (${arrayData[i].char[j].character.id},${arrayData[i].id},'${arrayData[i].char[j].character.name.replaceAll(",","").replaceAll("\'","").replaceAll("\"","")}','${arrayData[i].char[j].role}','${VAChecker(arrayData[i].char[j].voiceActors)}','${imageChecker(arrayData[i].char[j].character.image)}') ON CONFLICT (id) DO NOTHING;`)
                }
               
            }
        }
       
    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
    }
    return result
}


async function selectDataById(id){
    const client = await pool.connect()
    let result = ""
    let char = undefined
    try{
        result = await client.query(`SELECT * from personajes where anime_id = ${id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    if(result && result.rows){
        char = result.rows.map((e) => new Characters(e))
      
    }
    return anime
}


// solo se envia un solo objeto a modificar en un objeto json dentro de la pagina con el id especifico
async function updateCharById(animeData){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`UPDATE personajes set voice_actor = '${animeData.name}' where id = ${animeData.id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

async function deleteAllCharByIdAnime(id){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`DELETE FROM personajes where anime_id = ${id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
}

async function deleteCharById(id){
    const client = await pool.connect()
    let result = ""
    try{
        result = await client.query(`DELETE FROM personajes where id = ${id};`)

    }catch(err){
        console.error("Error en la insercion de datos",err.message)
        result = err.message
    }finally{
        client.release()
        
    }
    return result
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

function VAChecker(VAObject){
    if(VAObject.length === 0){
        return "Unknown";
    }else{
        for(let i = 0; i < VAObject.length; i++){
            if(VAObject[i].language == "Japanese"){
                if (!VAObject[i].person.name) {
                    return "Unknown";
                }else{
                    return VAObject[i].person.name.replaceAll(",","").replaceAll("\'","").replaceAll("\"","")
                }
            }else if(VAObject[i].language == "English"){
                if (!VAObject[i].person.name) {
                    return "Unknown";
                }else{
                    return VAObject[i].person.name.replaceAll(",","").replaceAll("\'","").replaceAll("\"","")
                }
            }else{
                return "Unknown";
            }
        }
    }
    
}



export default {
    insertCharJikan,
    selectDataById,
    updateCharById,
    deleteAllCharByIdAnime,
    deleteCharById
}
