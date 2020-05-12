//helper function to delete image on Cloudinary
const deleteImageOnCloudinary = user => {
  const cloudinary = require('cloudinary');
  cloudinary.v2.uploader.destroy(
    `${user.public_id}`, 
    (error, result) => console.log(result, error)
  );
}