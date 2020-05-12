const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../models/User')

const authControllers = {
  login(req, res, next){
    passport.authenticate("local", (err, theUser, failureDetails) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong authenticating user" });
        return;
      }
  
      if (!theUser) {
        res.status(401).json(failureDetails);
        return;
      }
  
      // save user in session
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Session save went bad." });
          return;
        }
  
        // We are now logged in (that's why we can also send req.user)
        res.status(200).json(theUser);
      });
    })(req, res, next);
  },

  signup(){
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