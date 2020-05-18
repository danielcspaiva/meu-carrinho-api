const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    googleID: {
      type:String
    },
    facebookId: {
      type:String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    stores: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Store',
      },
    ],
    imageUrl: {
      type: String,
      default: '', //to do
    },
    public_id: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
