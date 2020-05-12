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
  deleteOrder(req, res) {
    const { id, storeId } = req.params;

    Order.findOneAndDelete({ _id: id })
      .then((order) => {
        Store.findByIdAndUpdate(storeId, { $pull: { orders: order }})
          .then(() => res.status(200).json({ message: 'order removed', order }))
          .catch(() => res.status(500).json({ message: 'failed to remove order', error }));
      })
      .catch(() => res.status(500).json({ error }))
  },
  updateOrder(req, res) {
    const { id } = req.params;

    Order.findByIdAndUpdate(id, { status: 'done' })
      .then(() => res.status(200).json({ message: 'order updated', order }))
      .catch(() => res.status(500).json({ message: 'failed to update order status', error }));
  }
};

module.exports = orderControllers;
