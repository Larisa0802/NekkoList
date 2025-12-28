import animeRepo from '../repositories/anime_repository.mjs'

async function getAllAnimes(req, res){
    let animes = undefined
    try{
        animes = await animeRepo.selectAllAnime()
        console.log(typeof animes)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(animes).status(200)
   
}

async function getAnimeById(req, res){
    let animes = undefined
    try{
        animes = await animeRepo.selectAnimeById(req.body.id)
        console.log(typeof animes)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(animes).status(200)
   
}


export default {
        getAllAnimes,
        getAnimeById
    }