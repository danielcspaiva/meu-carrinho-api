const Product = require('../../models/Product');
const Store = require('../../models/Store');
const deleteImageOnCloudinary = require('../../helpers/helper_functions');

const productController = {
  createProduct(req, res) {
    const product = { ...req.body };

    if (req.file) {
      const { secure_url, public_id } = req.file;
      const customUrl = secure_url.split('upload/').join('upload/c_thumb,g_auto,h_462,w_462/');

      console.log(secure_url);      
      console.log(customUrl);

      product.imageUrl = customUrl;
      product.public_id = public_id;
    }

    Product
      .create(product)
      .then((product) => {
        const { storeId } = req.params;

        Store
          .findOneAndUpdate({ _id: storeId }, { $push: { products: product } })
          .then(() => res.status(200).json({ message: 'Product created', product }))
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  },
  editProduct(req, res) {
    const { id } = req.params;

    const product = { ...req.body };
    
    if (req.file) {
      const { secure_url, public_id } = req.file;
      const customUrl = secure_url.split('upload/').join('upload/c_thumb,g_auto,h_462,w_462/');

      product.imageUrl = customUrl;
      product.public_id = public_id;
      
      Product
        .findById(id)
        .then((prevProduct) => deleteImageOnCloudinary(prevProduct))
        .catch((error) => console.log('catch do cloudinary: ', error));
    }


    Product
      .findOneAndUpdate({ _id: id }, product)
      .then((product) => {
        product === null
          ? res.status(404).json({ message: 'Product not found' })
          : res.status(200).json({ message: 'Product updated' });
      })
      .catch((error) => res.status(500).json({ error: error }));
  },
  deleteProduct(req, res) {
    const { id, storeId } = req.params;

    Product
      .findOneAndDelete({ _id: id })
      .then((product) => {
        if (product === null) {
          res.status(404).json({ message: 'Product not founded' });
          return;
        }

        if (req.file) deleteImageOnCloudinary(product);

        Store
          .findOneAndUpdate({ _id: storeId }, { $pull: { products: product._id } })
          .then(() => res.status(200).json({ message: 'Product deleted' }))
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  },
  getProduct(req, res) {
    const { id } = req.params;

    Product
      .findById(id)
      .then((product) => {
        product === null
          ? res.status(404).json({ message: 'Product not found' })
          : res.status(200).json({ message: 'Product found', product });
      })
      .catch((error) => res.status(500).json({ error }));
  },
};

module.exports = productController;
