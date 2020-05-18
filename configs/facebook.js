var passport = require('passport')
FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config()

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({
        googleID: profile.id
      })
      .then(user => {
        if (user) {
          done(null, user);
          return;
        }

        User.create({
            facebookID: profile.id,
            username: profile.name.givenName,
            email: profile.emails[0].value,
            imageUrl: profile.photos[0].value
          })
          .then(newUser => {
            console.log(user)
          })
          .catch(err => done(err)); // closes User.create()
      })
      .catch(err => done(err));
  }
));