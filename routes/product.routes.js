const express = require('express');
const router = express.Router();

const productControllers = require('./controllers/productControllers');
const uploadCloud = require('../configs/cloudinary');

router.post('/:storeId/new', uploadCloud.single('image'), productControllers.createProduct);
// :id da store
router.patch('/edit/:id', uploadCloud.single('image'), productControllers.editProduct);
router.delete('/delete/:storeId/:id', productControllers.deleteProduct);
router.get('/:id', productControllers.getProduct);

module.exports = router;

// e ai galera