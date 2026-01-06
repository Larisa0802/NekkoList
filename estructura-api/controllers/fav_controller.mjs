import favRepo from '../repositories/fav_repository.mjs'

async function getAllFav(req, res){
    let favourites = undefined
    try{
        favourites = await favRepo.selectAllFavourites(req.params.id)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(favourites).status(200)
   
}

// data = {
//     userId:asd,
//     animeId:asd
// }
async function setFavourite(req, res){
    try{
        let data = {
            userId: req.params.userId,
            animeId: req.params.animeId,
        }
        console.log(data)
        await favRepo.insertFavorite(data)

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

// data = {
//     rating:asd,
//     usuario_id:asd,
//     anime_id:asd,
// }
async function updateFavourite(req, res){
    try{
        await favRepo.updateFavouriteById(req.body)

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

async function deleteFavourite(req, res){
    try{
        let data = {
            usuario_id: req.params.userId,
            anime_id: req.params.animeId
        }
        await favRepo.deleteFavouriteById(data)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}


export default {
        getAllFav,
        setFavourite,
        updateFavourite,
        deleteFavourite
    }