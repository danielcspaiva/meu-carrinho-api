const Order = require('../../models/Order');

const orderControllers = {
  getOrder(req, res){
      const { id } = req.params;

      Order.findById(id)
        .populate('products')
        .then( order => res.status(200).json({ order }))
        .catch( error => res.status(404).json({message: "order not found"}))

  }
}

module.exports = orderControllers;