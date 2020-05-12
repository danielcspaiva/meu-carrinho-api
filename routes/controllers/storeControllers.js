const Store = require('../../models/Store');
const User = require('../../models/User');
const deleteImageOnCloudinary = require('../../helpers/helper_functions')

const storeControllers = {
  createStore: (req, res, next) => {
    let user = req.user._id;

    const {
      name,
      about,
      primaryColor,
      secondaryColor,
      phone,
      type,
      lat,
      lng
    } = req.body;

    const location = {
      type: 'Point',
      coordinates: [+lng, +lat]
    }

    const theme = {
      primaryColor,
      secondaryColor
    }

    let storeToCreate = {
      name,
      about,
      theme,
      phone,
      type,
      location
    }

    if (req.file) {
      const {
        secure_url,
        public_id
      } = req.file;

      storeToCreate = {
        name,
        about,
        theme,
        phone,
        type,
        location,
        imageUrl: secure_url,
        public_id
      }
    }
    Store.create(storeToCreate)
      .then(newStore => {
        User.findByIdAndUpdate(user, {
            $push: {
              stores: newStore
            }
          })
          .then(res.status(200).json({
            message: 'Store added to user array',
            newStore
          }))
          .catch((error) => res.status(500).json({
            error: 'foi nesse'
          }))
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
        error: error
      })
    })
  },
  editStore: (req, res, next) => {
    const storeId = req.params.id;
    let user = req.user._id;

    const {
      name,
      about,
      primaryColor,
      secondaryColor,
      phone,
      type,
      lat,
      lng
    } = req.body;

    const location = {
      type: 'Point',
      coordinates: [+lng, +lat]
    }

    const theme = {
      primaryColor,
      secondaryColor
    }

    let storeToEdit = {
      name,
      about,
      theme,
      phone,
      type,
      location
    }

    if (req.file) {
      const {
        secure_url,
        public_id
      } = req.file;

      storeToEdit = {
        name,
        about,
        theme,
        phone,
        type,
        location,
        imageUrl: secure_url,
        public_id
      }

      Store.findById(storeId)
        .then(storeToEdit => deleteImageOnCloudinary(storeToEdit))
        .catch(error => console.log(error));
    }

    Store.findByIdAndUpdate(storeId, storeToEdit, { new: true })
      .then(updatedStore => res.status(200).json({
        message: 'Store Updated',
        updatedStore
      }))
      .catch((error) => res.status(500).json({
        error
      }))
  },
  deleteStore: (req, res, next) => {
    const storeId = req.params.id;
    let user = req.user._id;

    Store.findOneAndDelete({
        _id: storeId
      })
      .then(storeToRemove => {
        deleteImageOnCloudinary(storeToRemove)
        User.findByIdAndUpdate(user, {
            $pull: {
              stores: storeId
            }
          })
          .then(() => res.status(200).json({
            message: 'Store Deleted',
            storeToRemove
          }))
          .catch(error => res.status(500).json({
            error
          }));
      })
      .catch(error => res.status(500).json({
        error
      }));
  },
  getStore: (req, res, next) => {
    const storeName = req.params.name;

    Store.find({
        name: storeName
      })
      .then(store => res.status(200).json(store))
      .catch(error => res.status(500).json({
        error
      }))
  }
}

module.exports = storeControllers;

// Boa Ricky