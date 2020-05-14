const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../models/User')

const authControllers = {
  async signup(req, res){
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
      .then(user => {
        if (user.length > 0) {
          res.status(400).json({ message: 'user already exists' });
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        User
          .create({ ...req.body, password: hashPass })
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }))
      })
      .catch(() => console.log('caimos no primeiro catch'))
  },

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

  loggedin(req, res, next){
      if(req.isAuthenticated()) {
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