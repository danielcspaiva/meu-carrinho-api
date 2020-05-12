const express = require('express');
const router = express.Router();

const orderControllers = require('./controllers/orderControllers.js');

router.get('/order/:id', orderControllers.getOrder);


module.exports = router;
