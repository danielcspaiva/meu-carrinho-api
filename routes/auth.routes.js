const express = require('express');
const router = express.Router();

const authControllers = require('./authControllers.js');

router.post('/login', authControllers.login)
router.post('/signup', authControllers.signup)
router.post('/loggedin', authControllers.loggedin)

module.exports = router;
