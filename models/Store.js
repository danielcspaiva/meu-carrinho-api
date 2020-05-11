const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    imageUrl: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: undefined
        },
        coordinates: {
            type: [Number],
            default: undefined
        }
      }
  },
  {
    timestamps: true,
  }
);

const Store = model('Store', storeSchema);

module.exports = Store;
