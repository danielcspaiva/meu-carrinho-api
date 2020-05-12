const Order = require('../../models/Order');
const Store = require('../../models/Store')

const orderControllers = {
  getOrder(req, res) {
    const { id } = req.params;

    Order.findById(id)
      .populate('products')
      .then((order) => res.status(200).json({ order }))
      .catch((error) => res.status(404).json({ message: 'order not found' }));
  },
  createOrder(req, res) {
    const { storeId } = req.params;

    Order.create(req.body)
      .then((order) => {
        Store.findByIdAndUpdate(storeId, { $push: { orders: order }})
          .then(() => res.status(200).json({ message: 'order created', order }))
          .catch(() => res.status(500).json({ message: 'failed to create order', error }));
      })
      .catch(() => res.status(500).json({ error }));
  },
};

module.exports = orderControllers;
