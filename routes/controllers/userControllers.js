const User = require('../../models/User');
const cloudinary = require('cloudinary');

//helper function to delete image on Cloudinary
const deleteImageOnCloudinary = user => {
  cloudinary.v2.uploader.destroy(
    `${user.public_id}`, 
    (error, result) => console.log(result, error)
  );
}

const userControllers = {
  
  editUser(req, res) {
    const { id } = req.params;
    const userInfo = {...req.body};

    if(req.file){
      userInfo.imageUrl = req.file.secure_url;
      userInfo.public_id = req.file.secure_url;
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

    User.findByIdAndDelete(id)
      .then( user => {
        deleteImageOnCloudinary(user);
        res.status(200).json({ message: 'account deleted' })
      })
      .error(error => res.status(500).json({ message: "user not found"}))
  },

  getUser(req, res) {
    const { id } = req.params;

    User.findById(id)
      .then( user => res.status(200).json({user}))
      .catch( error => res.status(404).json({ message: "user not found"}))
  }
}

module.exports = userControllers;