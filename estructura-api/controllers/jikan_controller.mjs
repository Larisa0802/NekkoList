import Jikan from 'jikan4.js'
import animeRepo from '../repositories/anime_repository.mjs'

async function getAnimebyId(req, res){
    const client = new Jikan.Client()
    let arrayData = []
    for(let i = 1; i <= 1000; i++){
        const anime = await client.anime.get(i)
        if(anime){
            // meter personajes de los animes que se clicken en mas informacion, deben llevar otra tabla en base de datos
            
            // let asd3 = await anime.getCharacters()
            // let asd4 = await anime.getStaff()
            // let asd5 = await anime.getRecommendations()
            // console.log(asd3)
            arrayData.push(anime)
        }else{
            console.log(`Anime with ID ${i} does not exist.`)
        }
    }
    console.log(arrayData)
    let asd = await animeRepo.insertAnimeJikan(arrayData)
    res.sendStatus(200)
   
}


export default {
        getAnimebyId,
    }