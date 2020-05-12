const User = require('../../models/User');
const Store = require('../../models/Store');
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const deleteImageOnCloudinary = require('../../helpers/helper_functions');


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

    User
      .findOneAndDelete({_id:id})
      .then( user => {
        if(user.public_id){
          deleteImageOnCloudinary(user);
        }

        user.stores.forEach(store => {
          Store
            .findOneAndDelete({ _id: store._id })
            .then(async storeDeleted => {

              await storeDeleted.orders.forEach(async order => {
                try {
                  const orderDeleted = await Order.findOneAndDelete({ _id: order._id})
                  console.log('orders deleted!', orderDeleted)
                } catch (error) {
                  console.log('failed on deleting orders!', error)
                }
              });

              await storeDeleted.products.forEach(async product => {
                try {
                  const productDeleted = await Product.findOneAndDelete({ _id: product._id})
                  deleteImageOnCloudinary(productDeleted);
                  console.log('product deleted!', productDeleted);
                } catch (error) {
                  console.log('failed on deleting product!', error)
                }
              });


              res.status(200).json({ message: 'account deleted' })
            })
            .catch((error) => console.log('Primeiro catch: ', error))
        })


      })
      .catch(error => res.status(500).json({ message: "user not found"}))
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