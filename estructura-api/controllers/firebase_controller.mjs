import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword, updateEmail, reauthenticateWithCredential,EmailAuthProvider} from "firebase/auth";


// https://firebase.google.com/docs/auth/web/manage-users?hl=es-419

async function signUp(req,res){
    const auth = getAuth();
    try{
        let userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        if(!userCredential){
            res.status(400)
        }else{
            res.send(userCredential).status(200)
        }
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json(error).status(500)
    }
    

}

async function logIn(req,res){
    const auth = getAuth();
    try{

        let userCredential = await signInWithEmailAndPassword(auth,req.body.email, req.body.password)
        if(userCredential._tokenResponse.registered){
            res.send(userCredential).status(200)
        }else{
            res.status(400) 
        }

    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json(error).status(500)
    }
    
}

async function signOutUser(req,res){
    const auth = getAuth()
    try{
        let userCredential = await signOut(auth)
        res.sendStatus(200)
    }catch(error){
        res.json(error).status(500)
    }
    

}

async function changePassword(req,res){
    const auth = getAuth();

    const user = auth.currentUser;
    const newPassword = req.body.password;
    try{
        let userCredential = await updatePassword(user, newPassword)
        res.sendStatus(200)
    }catch(error){
        res.json(error).status(500)
    }
} 

async function changeEmail(req,res){
    const auth = getAuth();
    const user = auth.currentUser;
    let credentials = EmailAuthProvider.credential(
        user.email, 
        req.body.passwordChange
    );
    try{
        let asd = await reauthenticateWithCredential(user, credentials)

        let userCredential = await updateEmail(user, req.body.emailChange)
        
        res.sendStatus(200)
    }catch(error){
        res.json(error).status(500)
    }
    
}

    export default {
        signUp,
        logIn,
        signOutUser,
        changePassword,
        changeEmail
    }