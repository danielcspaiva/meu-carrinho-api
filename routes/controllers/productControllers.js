const Product = require('../../models/Product');
const Store = require('../../models/Store');

const productController = {
  createProduct(req, res) {
    const product = { ...req.body };

    if (req.file) {
      product.imageUrl = req.file.secure_url;
      product.public_id = req.file.public_id;
    }

    Product.create(product)
      .then((product) => {
        const { id } = req.params;

        Store.findOneAndUpdate({ _id: id }, { $push: { products: product } })
          .then(() =>
            res.status(200).json({ message: 'Product created', product })
          )
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  },
  editProduct(req, res) {
    const { id } = req.params;

    const product = { ...req.body };
    console.log(product);
    if (req.file) {
      product.imageUrl = req.file.secure_url;
      product.public_id = req.file.public_id;
    }

    Product.findOneAndUpdate({ _id: id }, product, { new: true })
      .then((product) => {
        product === null
          ? res.status(404).json({ message: 'Product not found' })
          : res.status(200).json({ message: 'Product updated', product });
      })
      .catch((error) => res.status(500).json({ error }));
  },
  deleteProduct(req, res) {
    const { id } = req.params;

    Product.findOneAndDelete({ _id: id })
      .then((product) => {
        product === null
          ? res.status(404).json({ message: 'Product not founded' })
          : Store.findOneAndUpdate(
              { _id: id },
              { $pull: { products: product } }
            )
              .then(() => {
                res.status(200).json({ message: 'Product deleted', product });
              })
              .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  },
  getProduct(req, res) {
    const { id } = req.params;

    Product.findById(id)
      .then((product) => {
        product === null
          ? res.status(404).json({ message: 'Product not founded' })
          : res.status(200).json({ message: 'Product founded', product });
      })
      .catch((error) => res.status(500).json({ error }));
  },
};

module.exports = productController;
