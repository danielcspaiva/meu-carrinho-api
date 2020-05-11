const express = require('express');
const router = express.Router();

const storeControllers = require('./storeControllers.js');

router.post('/new', storeControllers.createStore)
router.patch('/edit/:id', storeControllers.editStore)
router.delete('/delete/id', storeControllers.deleteStore)
router.get('/:name', storeControllers.getStore)

module.exports = router;
