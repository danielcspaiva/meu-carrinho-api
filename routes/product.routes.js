const express = require('express');
const router = express.Router();

const productControllers = require('./productControllers.js');

router.post('/new', productControllers.createProduct);
router.patch('/edit/:id', productControllers.editProduct);
router.delete('/delete/:id', productControllers.deleteProduct);
router.get('/:id', productControllers.getProduct);

module.exports = router;

// e ai galera