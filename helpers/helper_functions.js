//helper function to delete image on Cloudinary
const deleteImageOnCloudinary = obj => {
  const cloudinary = require('cloudinary');
  cloudinary.v2.uploader.destroy(
    `${obj.public_id}`, 
    (error, result) => console.log(result, error)
  );
}

module.exports = deleteImageOnCloudinary;
