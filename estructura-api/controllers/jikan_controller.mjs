import Jikan from 'jikan4.js'
import animeRepo from '../repositories/anime_repository.mjs'
import charRepo from '../repositories/characters_repository.mjs'

async function getAnimebyId(req, res){
    const client = new Jikan.Client()
    let arrayData = []
    let arrayDataCharacters = []
    for(let i = 1; i <= 1000; i++){
        const anime = await client.anime.get(i)
        if(anime){
            // meter personajes de los animes que se clicken en mas informacion, deben llevar otra tabla en base de datos
            
            let characters = await anime.getCharacters()
            arrayDataCharacters.push({char:characters,id:i})
            arrayData.push(anime)
        }else{
            console.log(`Anime with ID ${i} does not exist.`)
        }
    }
    console.log(arrayData)
    let asd = await animeRepo.insertAnimeJikan(arrayData)
    let asd2 = await charRepo.insertCharJikan(arrayDataCharacters)
    res.sendStatus(200)
   
}


export default {
        getAnimebyId,
    }