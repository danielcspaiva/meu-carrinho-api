const express = require('express');
const router = express.Router();

const userControllers = require('./userControllers.js');

router.patch('/edit/:id', userControllers.editUser);
router.delete('/delete/:id', userControllers.deleteUser);
router.get('/:id', userControllers.getUser);
module.exports = router;
