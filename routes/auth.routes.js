const express = require('express');
const router = express.Router();

const authControllers = require('./controllers/authControllers.js');

router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.get('/loggedin', authControllers.loggedin);
router.get('/logout', authControllers.logout);

module.exports = router;
