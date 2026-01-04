import animeRepo from '../repositories/anime_repository.mjs'

async function getAllAnimes(req, res){
    let animes = undefined
    try{
        animes = await animeRepo.selectAllAnime()
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(animes).status(200)
   
}

async function getAnimeById(req, res){
    let animes = undefined
    try{
        animes = await animeRepo.selectAnimeById(req.params.id)

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(animes).status(200)
   
}


// data = {
//     id:asd,
//     titulo:asd,
//     genero:asd,
//     descripcion:asd,
//     episodios:asd,
//     fecha_pub:asd,
//     imagen:asd,
// }
async function updateAnime(req, res){
    try{
        await animeRepo.updateAnimeById(req.body.data)

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

async function deleteAnime(req, res){
    try{
        await animeRepo.deleteAnimeById(req.body.id)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

async function getAnimeFollowStat(req, res){
    let animes = undefined
    try{
        animes = await animeRepo.selectAnimeFollowedStat()

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(animes).status(200)
   
}


export default {
        getAllAnimes,
        getAnimeById,
        updateAnime,
        deleteAnime,
        getAnimeFollowStat
    }