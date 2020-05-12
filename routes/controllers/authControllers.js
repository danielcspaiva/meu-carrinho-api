const passport = require('passport');

const authControllers = {
  login(){
    //to do

  },

  signup(){
    //to do 
  },

  loggedin(req, res, next){
      if (req.isAuthenticated()) {
          res.status(202).json(req.user)
          return
      }
      res.status(401).json({ message: 'Unauthorized' })
  },

  logout(req, res, next){
    req.logout()
    res.status(200).json({ message: 'Logout successfully' })
  },  
  
}

module.exports = authControllers;