import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,validatePassword  } from "firebase/auth";


// https://firebase.google.com/docs/auth/web/manage-users?hl=es-419

async function signUp(req,res){
    const auth = getAuth();
    let asd = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password).then((userCredential) => {
        // Signed up 
        console.log(userCredential)
        res.send(userCredential).status(200)
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
    console.log(req.body.password)
    let asd = await signInWithEmailAndPassword(auth, req.body.email, req.body.password).then((userCredential) => {
        // Signed in 
        //_tokenResponse.localId es el uuid de base de datos
        console.log(userCredential)
        res.send(userCredential).status(200)
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json(error)
    });
}

async function signOutUser(req,res){
    const auth = getAuth()
    await signOut(auth).then(() => {
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