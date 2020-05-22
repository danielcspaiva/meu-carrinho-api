const Store = require('../../models/Store');
const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const deleteImageOnCloudinary = require('../../helpers/helper_functions');

const storeControllers = {
  createStore: (req, res, next) => {
    let user = req.user._id;
    let {
      name,
      about,
      primaryColor,
      secondaryColor,
      phone,
      type,
      lat,
      lng,
    } = req.body;

    // Provisório
    if(!lat) {
      lat = 0,
      lng = 0
    }

    const location = {
      type: 'Point',
      coordinates: [+lng, +lat],
    };

    const theme = {
      primaryColor,
      secondaryColor,
    };

    let storeToCreate = {
      name,
      about,
      theme,
      phone,
      type,
      location,
    };

    if (req.file) {
      const { secure_url, public_id } = req.file;

      storeToCreate.imageUrl = secure_url;
      storeToCreate.public_id = public_id;
    }

    Store.create(storeToCreate)
      .then((newStore) => {
        User.findByIdAndUpdate(user, {
          $push: {
            stores: newStore,
          },
        })
          .then(
            res.status(200).json({
              message: 'Store added to user array',
              newStore,
            })
          )
          .catch((error) =>
            res.status(500).json({
              error: 'foi nesse',
            })
          );
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
  },
  editStore: (req, res, next) => {
    const storeId = req.params.id;
    let user = req.user._id;

    let {
      name,
      about,
      primaryColor,
      secondaryColor,
      phone,
      type,
      lat,
      lng,
    } = req.body;

    // Provisório
    if (!lat) {
      lat = 0,
      lng = 0
    }

    const location = {
      type: 'Point',
      coordinates: [+lng, +lat],
    };

    const theme = {
      primaryColor,
      secondaryColor,
    };

    let storeToEdit = {
      name,
      about,
      theme,
      phone,
      type,
      location,
    };

    if (req.file) {
      const { secure_url, public_id } = req.file;

      storeToEdit = {
        name,
        about,
        theme,
        phone,
        type,
        location,
        imageUrl: secure_url,
        public_id,
      };

      Store.findById(storeId)
        .then((storeToEdit) => deleteImageOnCloudinary(storeToEdit))
        .catch((error) => console.log(error));
    }

    Store.findByIdAndUpdate(storeId, storeToEdit, { new: true })
      .then((updatedStore) =>
        res.status(200).json({
          message: 'Store Updated',
          updatedStore,
        })
      )
      .catch((error) =>
        res.status(500).json({
          error,
        })
      );
  },

  deleteStore: (req, res, next) => {
    const storeId = req.params.id;
    let user = req.user._id;

    Store.findOneAndDelete({
      _id: storeId,
    })
      .then((storeToRemove) => {
        deleteImageOnCloudinary(storeToRemove);

        let promisses = [];
        let productsToBeRemoved = storeToRemove.products;
        let ordersToBeRemoved = storeToRemove.orders;
        let userPromisse = User.findByIdAndUpdate(user, {
          $pull: { stores: storeId },
        });

        productsToBeRemoved.forEach((productId) =>
          promisses.push(Product.findByIdAndDelete(productId))
        );
        ordersToBeRemoved.forEach((orderId) =>
          promisses.push(Order.findByIdAndDelete(orderId))
        );

        Promise.all([...promisses, userPromisse])
          .then((values) => {
            //checks for 'public_id' in the Promisses values and deletes it
            values.map((item) => {
              if (item.public_id) deleteImageOnCloudinary(item);
            });
            res.status(200).json({
              message: 'Store and products deleted',
              storeToRemove,
            });
          })
          .catch((error) =>
            res.status(500).json({
              message: 'foi aqui',
              error: error
            })
          );
      })
      .catch((error) =>
        res.status(500).json({
          message: 'foi no outro',
          error: error
        })
      );
  },

  getStore: (req, res, next) => {
    const storeName = req.params.name;

    Store.find({
      name: storeName,
    })
      .populate('products')
      .populate('orders')
      .populate({
        path: 'orders',
        populate: { path: 'products.product' }
      })
      .then((store) => {
        res.status(200).json(store)
      })
      .catch((error) =>
        res.status(500).json({
          error,
        })
      );
  },
};

module.exports = storeControllers;