const User = require('../../models/User');
require('../../helpers/helper_functions');


const userControllers = {
  
  editUser(req, res) {
    const { id } = req.params;
    const userInfo = {...req.body};

    if(req.file){
      userInfo.imageUrl = req.file.secure_url;
      userInfo.public_id = req.file.public_id;
    }

    User.findByIdAndUpdate(id, userInfo)
      .then( user => {
        if(req.file){
          deleteImageOnCloudinary(user);
        }
        res.json({user})
      })
      .catch( error => res.status(404).json({ message: "user not found"}))

  },

  deleteUser(req, res) {
    const { id } = req.params;

    User.findOneAndDelete({_id:id})
      .then( user => {
        deleteImageOnCloudinary(user);
        res.status(200).json({ message: 'account deleted' })
      })
      .error(error => res.status(500).json({ message: "user not found"}))
  },

  getUser(req, res) {
    const { id } = req.params;

    User.findById(id)
      .populate('stores')
      .then( user => res.status(200).json({user}))
      .catch( error => res.status(404).json({ message: "user not found"}))
  }
}

module.exports = userControllers;