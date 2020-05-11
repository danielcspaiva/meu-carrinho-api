const express = require('express');
const router = express.Router();

const userControllers = require('./controllers/userControllers.js');

//Cloudinary config import
const uploadCloud = require('../configs/cloudinary');

router.patch('/edit/:id', uploadCloud.single('file'), userControllers.editUser);
router.delete('/delete/:id', userControllers.deleteUser);
router.get('/:id', userControllers.getUser);
module.exports = router;
