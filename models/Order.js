const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productsSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);
const orderSchema = new Schema(
  {
    products: [productsSchema],
    total: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'done'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', orderSchema);

module.exports = Order;
