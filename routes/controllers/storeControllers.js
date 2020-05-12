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
    } = req.body
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
      } = req.file;

      storeToCreate = {
        name,
        about,
        theme,
        phone,
        type,
        location,
        imageUrl: secure_Url
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
      .catch((error) => res.status(500).json({ error }))
  },
  editStore: (req, res, next) => {},
  deleteStore: (req, res, next) => {},
  getStore: (req, res, next) => {}
}

module.exports = storeControllers;