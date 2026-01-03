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

// data = {
//     id:asd,
//     email:asd
// }
async function updateUserEmail(req, res){
    try{
        await userRepo.updateUserById(req.body.data)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

// data = {
//     id:asd,
//     name:asd
// }
async function updateUserName(req, res){
    try{
        await userRepo.updateUserById(req.body.data)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}

async function deleteUser(req, res){
    try{
        await userRepo.deleteUserById(req.body.id)
    }catch(error){
        console.log(error)
        res.send(error).status(500)
    }
    res.sendStatus(200)
   
}


export default {
    insertUser,
    getUserData,
    updateUserEmail,
    updateUserName,
    deleteUser
}