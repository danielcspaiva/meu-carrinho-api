const express = require('express');
const router = express.Router();

const orderControllers = require('./controllers/orderControllers.js');


router.patch('/update/:id', orderControllers.getOrder);
router.delete('/delete/:storeId/:id', orderControllers.deleteOrder);
// id da loja
router.post('/:storeId/new', orderControllers.createOrder);
router.get('/:id', orderControllers.getOrder);


module.exports = router;
