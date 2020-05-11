const Product = require('../../models/Product');

const productController = {
  createProduct(req, res) {
    Product.create(req.body)
      .then((product) =>
        res.status(200).json({ message: 'Product created', product })
      )
      .catch((error) => res.status(500).json({ error }));
  },
  editProduct(req, res) {
    const { id } = req.params;

    Product.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
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
          : res.status(200).json({ message: 'Product deleted', product });
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
