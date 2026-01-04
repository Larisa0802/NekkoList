import charRepo from '../repositories/characters_repository.mjs'


async function getCharByAnime(req, res){
    let char = undefined
    try{
        char = await charRepo.selectDataById(req.params.id)

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(char).status(200)
   
}


async function updateCharVA(req, res){
    try{
        await charRepo.updateCharById(req.body.data)

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

async function deleteCharInfo(req, res){
    try{
        await charRepo.deleteAllCharByIdAnime(req.params.id)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

async function deleteCharById(req, res){
    let char = undefined
    try{
        char = await charRepo.deleteCharById(req.params.id)

    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(char).status(200)
   
}


export default {
        getCharByAnime,
        updateCharVA,
        deleteCharInfo,
        deleteCharById
    }