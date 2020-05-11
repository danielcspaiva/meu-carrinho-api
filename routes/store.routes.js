const express = require('express');
const router = express.Router();

const storeControllers = require('./controllers/storeControllers.js');

router.post('new', storeControllers.createStore)
router.patch('edit/:id', storeControllers.editStore)
router.delete('delete/id', storeControllers.getStore)
router.get(':name', storeControllers.getStore)

module.exports = router;
