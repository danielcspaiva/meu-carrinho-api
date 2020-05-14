const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id).populate('stores').exec((err, user) => done(err, user));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email: email })
      .populate('stores')
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch( err => {
        console.log(err)
        return done(err);
      })

    }
  )
);