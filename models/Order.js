const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number
    },
    status: {
      type: String,
      enum: ['pending', 'done'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', orderSchema);

module.exports = Order;
