const express = require('express');
const router = express.Router();

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

module.exports = router;
