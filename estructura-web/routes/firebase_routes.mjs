import express from "express";
import firebaseController from "../controllers/firebase_controller.mjs";

const router = new express.Router();

// Middleware para obtener el usuario de la cookie

//Mostrar pags

router.get("/", async (req, res) => {
  let rankingAnimeFav = [];
  let rankingUserFav = [];

  try {
    const anime = await firebaseController.client.get("/getAnimeFollowStat");
    const users = await firebaseController.client.get("/getUserFollowStat");
    rankingAnimeFav = anime.data || [];
    rankingUserFav = users.data || [];
  } catch (err) {
    console.log("Error obteniendo rankings:", err.message);
  }

  res.render("completes/index", {
    user: res.locals.user || null,
    rankingAnimeFav,
    rankingUserFav
  });
});


router.get("/login", (req, res) => {
  res.render("completes/logIn", { errorL: null,log: ""});
});

router.get("/register", (req, res) => {
  res.render("completes/register");
});

router.get("/logOut", (req, res) => {
  res.render("completes/logOut");
});


router.get("/inicio", async (req, res) => {
  let rankingAnimeFav = [];
  let rankingUserFav = [];

  try {
    const anime = await firebaseController.client.get("/getAnimeFollowStat");
    const users = await firebaseController.client.get("/getUserFollowStat");
    rankingAnimeFav = anime.data || [];
    rankingUserFav = users.data || [];
  } catch (err) {
    console.log("Error obteniendo rankings:", err.message);
  }

  res.render("completes/index", {
    rankingAnimeFav,
    rankingUserFav
  });
});

router.get("/contact", (req, res) => {
  res.render("completes/contact");
});

router.get("/profile", firebaseController.getProfile);

router.get("/changePassword", (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/login")
  }
  res.render("completes/changePassword");
});

router.get("/changeEmail", (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/login")
  }
  res.render("completes/changeEmail");
});

router.get("/deleteUser", (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/login")
  }
  res.render("completes/deleteAccount");
});

router.get("/changeName", (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/login")
  }
  res.render("completes/changeName");
});

//Enviar datos al servidor desde formularios/axios
router.post("/signUp", firebaseController.signUp);
router.post("/logIn", firebaseController.logIn);
router.post("/signOutUser", firebaseController.signOutUser);
router.post("/updatePassword", firebaseController.updatePassword);
router.post("/updateEmail", firebaseController.updateEmail);
router.post("/updateUserName", firebaseController.updateName);
router.post("/deleteUser", firebaseController.deleteUser)

export default router;
