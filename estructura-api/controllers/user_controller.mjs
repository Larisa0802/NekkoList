import userRepo from '../repositories/user_repository.mjs'

async function insertUser(req, res){
    let user = undefined
    try{
        let userData = {
            email:req.body.email,
            id: req.body.id,
            nombre:req.body.nombre
        }

        user = await userRepo.insertUser(userData)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
}

async function getUserData(req, res){
    let user = undefined
    try{
        user = await userRepo.selectUserById(req.params.id)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.send(user).status(200)
   
}


export default {
    insertUser,
    getUserData
}