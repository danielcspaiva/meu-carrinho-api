const User = require('../../models/User');

const userController = {
  getUser(){
    const { id } = req.params;

    User.findById(id)
      .then()
      .catch()
  },

  editUser(){

  },

  deleteUser(){

  }
}

module.exports = userController;