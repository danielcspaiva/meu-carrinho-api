const express = require('express');
const router = express.Router();

const orderControllers = require('./controllers/orderControllers.js');

router.get('/:id', orderControllers.getOrder);

// id da loja
router.post('/:storeId/new', orderControllers.createOrder);


module.exports = router;
