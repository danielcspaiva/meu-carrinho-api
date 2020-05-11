const User = require('../../models/User');

const userControllers = {
  
  editUser() {
    const { id } = req.params;
    const { name, number } = req.body;

    User.findByIdAndUpdate(id, { name, number })
      .then( user => res.json({user}))
      .catch( error => res.status(404).json({ message: "user not found"}))

  },

  deleteUser() {
    const { id } = req.params;

    User.findByIdAndDelete(id)
      .then( user => res.json({ user }))
      .error(error => res.status(500).json({ message: "user not found"}))
  },

  getUser() {
    const { id } = req.params;

    User.findById(id)
      .then( user => res.json({user}))
      .catch( error => res.status(404).json({ message: "user not found"}))
  }
}

module.exports = userControllers;