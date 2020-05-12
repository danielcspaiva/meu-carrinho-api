const Order = require('../../models/Order');
const Store = require('../../models/Store');
const Product = require('../../models/Product');

const orderControllers = {
  getOrder(req, res) {
    const { id } = req.params;

    Order.findById(id)
      .populate({ path: 'products.product', model: 'Product' })
      .then((order) => res.status(200).json({ order }))
      .catch(() => res.status(404).json({ message: 'order not found' }));
  },
  createOrder(req, res) {
    const { storeId } = req.params;

    Order.create(req.body)
      .then((order) => {
        Store.findByIdAndUpdate(storeId, { $push: { orders: order }})
          .then(() => {

            /**
             * TODO:
             * Aqui precisamos atualizar o quantity dos 
             * products que vieram na order, no caso a order
             * foi crida, portanto é preciso subtrair o
             * quantity atual do product com o dessa order
             */

            res.status(200).json({ message: 'order created', order })
          })
          .catch((error) => res.status(500).json({ message: 'failed to create order', error }));
      })
      .catch((error) => res.status(500).json({ error }));
  },
  deleteOrder(req, res) {
    const { id, storeId } = req.params;

    Order.findOneAndDelete({ _id: id })
      .then((order) => {
        Store.findByIdAndUpdate(storeId, { $pull: { orders: order }})
          .then(() => {

            /**
             * TODO:
             * Aqui precisamos atualizar o quantity
             * dos products dessa order, no caso a order
             * foi cancelada, portanto é preciso somar o
             * quantity atual do product com o dessa order
             */

            res.status(200).json({ message: 'order removed', order })
          })
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
