const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    theme: {
      primaryColor: {
        type: String,
        default: 'white'
      },
      secondaryColor: {
        type: String,
        default: 'black'
      },
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    phone: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: undefined,
      },
      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Store = model('Store', storeSchema);

module.exports = Store;
