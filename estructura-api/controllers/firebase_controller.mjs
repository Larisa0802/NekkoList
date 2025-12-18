import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,validatePassword  } from "firebase/auth";


// https://firebase.google.com/docs/auth/web/manage-users?hl=es-419

async function signUp(req,res){
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, req.body.email, req.body.password).then((userCredential) => {
        // Signed up 
        if(!userCredential == true){
            res.status(400)
        }else{
            res.send(userCredential).status(200)
        }
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json(error)
        // ..
    });
}

async function logIn(req,res){
    const auth = getAuth();
    await signInWithEmailAndPassword(auth,req.body.email, req.body.password).then((userCredential) => {
        // Signed in 
        //_tokenResponse.localId es el uuid de base de datos
        if(userCredential._tokenResponse.registered){
            res.send(userCredential).status(200)
            
        }else{
            res.status(400) 
        }
        
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json(error)
    });
}

async function signOutUser(req,res){
    const auth = getAuth()
    await signOut(auth).then((userCredential) => {
        res.sendStatus(200)
    }).catch((error) => {
        res.json(error)
    });
}

    export default {
        signUp,
        logIn,
        signOutUser
    }