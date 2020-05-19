const Order = require('../../models/Order');
const Store = require('../../models/Store');
const Product = require('../../models/Product');
const User = require('../../models/User')
const transporter = require('../../configs/nodemailer');


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
        const promises = [];

        order.products.forEach(element => {
          promises.push(
            Product.findByIdAndUpdate(
              element.product, 
              { $inc: { quantity: -(element.quantity) }}
            )
          );
        })

        promises.push(Store.findByIdAndUpdate(storeId, { $push: { orders: order }}));
        
        Promise.all(promises)
        .then(() => res.status(200).json({ message: 'order created', order }))
        .catch((error) => res.status(500).json({ error }));

        User.find({stores: storeId})
          .then(user => {
            transporter.sendMail({
              from: '"Sacada do Prédio" <sacadadopredio@gmail.com>',
              to: user[0].email,
              subject: 'Novo ordem registrada',
              text: ``,
              html: `
                  <p>Olá ${user[0].name},</p>

                  <p>Uma nova ordem foi registrada na sua loja, confira acessando o dashboard da sua loja.</p>
                  
                  <p>Detalhes do pedido:${order}</p>

                  <p>Muito obrigado,</p>

                  <strong style="rgb(198, 72, 12)">Meu carrinho team</strong>
              `
            })
          })
          .catch(err => console.log(err))
      })
      .catch((error) => res.status(500).json({ error }));
  },
  deleteOrder(req, res) {
    const { id, storeId } = req.params;

    Order.findOneAndDelete({ _id: id })
      .then((order) => {
        const promises = [];

        order.products.forEach(element => {
          console.log('product: ', element.product)
          console.log('quantity: ', element.quantity)
          promises.push(
            Product.findByIdAndUpdate(
              element.product, 
              { $inc: { quantity: element.quantity }}
            )
          );
        })

        promises.push(Store.findByIdAndUpdate(storeId, { $pull: { orders: order._id }}));
        
        Promise.all(promises)
          .then(() => res.status(200).json({ message: 'order deleted', order }))
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(501).json({ error }))
  },
  updateOrder(req, res) {
    const { id } = req.params;

    Order.findByIdAndUpdate(id, {status: 'done'})
      .then(() => res.status(200).json({ message: 'order updated', order }))
      .catch((error) => res.status(500).json({ message: 'failed to update order status', error }));
  }
};

module.exports = orderControllers;
