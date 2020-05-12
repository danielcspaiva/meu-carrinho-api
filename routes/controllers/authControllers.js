const User = require('../../models/User');

const authControllers = {
  signup(req, res){
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(406).json({ message: 'name, email or password not provided' });
      return;
    }

    if (password.length < 6) {
      res.status(411).json({ messsage: 'password must have 6 characters at least' });
      return;
    }

    User.find({ email })

    User
      .create()
      .then((user) => res.status(201).json({ user }))
      .catch((error) => res.status(500).json({ error }))
  },

  login(){
    //to do

  },

  loggedin(){
    //to do
  },

  logout() {
    // TODO
  },

  
}

module.exports = authControllers;