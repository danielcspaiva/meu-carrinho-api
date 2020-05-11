const express = require('express');
const router = express.Router();

const userControllers = require('./userControllers.js');

router.get('/edit/:id', userControllers.editUser)
router.get('/delete/:id', userControllers.deleteUser)
router.get('/:id', userControllers.getUsers)
module.exports = router;
