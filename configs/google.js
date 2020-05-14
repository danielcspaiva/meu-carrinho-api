require('dotenv').config()

const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_ID,
  clientSecret: process.env.GOOGLE_AUTH_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

  User.findOne({
      googleID: profile.id
    })
    .then(user => {
      if (user) {
        done(null, user);
        return;
      }

      User.create({
          googleID: profile.id,
          username: profile.name.givenName,
          email: profile.emails[0].value,
          imageUrl: profile.photos[0].value
        })
        .then(newUser => {
          console.log(user)
        })
        .catch(err => done(err)); // closes User.create()
    })
    .catch(err => done(err)); // closes User.findOne()
}));