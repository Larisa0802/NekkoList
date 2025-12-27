import Jikan from 'jikan4.js'
import animeRepo from '../repositories/anime_repository.mjs'

async function getAnimebyId(req, res){
    const client = new Jikan.Client()
    let arrayData = []
    for(let i = 1; i <= 1000; i++){
        const anime = await client.anime.get(i)
        if(anime){
            console.log(anime.title)
            arrayData.push(anime)
        }else{
            console.log(`Anime with ID ${i} does not exist.`)
        }
    }
    // console.log(arrayData)
    await animeRepo.insertAnime(arrayData)
    res.send(arrayData).status(200)
   
}


export default {
        getAnimebyId,
    }