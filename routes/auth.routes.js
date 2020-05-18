const express = require('express');
const router = express.Router();
const passport = require('passport');

const authControllers = require('./controllers/authControllers.js');

router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.get('/loggedin', authControllers.loggedin);
router.get('/logout', authControllers.logout);

//Google
router.get("/google", passport.authenticate("google", {
  scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
  ]
}))

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000/minhaslojas",
  failureRedirect: "http://localhost:3000/" // here you would redirect to the login page using traditional login approach
}), (req, res) => {
  res.status(200).json({ message: 'Logado'})
});

module.exports = router;
