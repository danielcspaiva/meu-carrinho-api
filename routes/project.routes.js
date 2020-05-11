const express = require('express');
const router = express.Router();

const projectControllers = require('./projectControllers.js');

router.post('/new', projectControllers.createProduct);
router.patch('/edit/:id', projectControllers.editProduct);
router.delete('/delete/:id', projectControllers.deleteProduct);
router.get('/:id', projectControllers.getProduct);

module.exports = router;

// e ai galera