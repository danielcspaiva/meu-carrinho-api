const express = require('express');
const router = express.Router();

const storeControllers = require('./controllers/storeControllers.js');

const uploadCloud = require('../configs/cloudinary');

router.post('/new', uploadCloud.single('image'), storeControllers.createStore)
router.patch('/edit/:id', uploadCloud.single('image'), storeControllers.editStore)
router.delete('/delete/:id', storeControllers.deleteStore)
router.get('/:name', storeControllers.getStore)

module.exports = router;
