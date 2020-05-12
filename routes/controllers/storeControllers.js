const Store = require('../../models/Store');

const storeControllers = {
  createStore: (req, res, next) => {
    // // let user = req.user._id
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
        res.status(200).json({ message: 'Store Created', newStore })
        // User.findByIdAndUpdate(user, {
        //   $push: {
        //     stores: newStore
        //   }
        // })
        // // // .then(res.status(200).json({ message: 'Store added to user array', user }))
        // .catch((error) => res.status(500).json({ error }))
      })
      .then(storeToRemove => {
        cloudinary.v2.uploader.destroy(`${storeToRemove.public_id}`, function (error, result) {
          console.log(result, error)
        });
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