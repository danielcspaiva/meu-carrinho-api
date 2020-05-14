require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const passport = require("passport");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // ==> 1 day
    }),
  })
);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log(`connected: ${response.connections[0].name}`))
  .catch((error) => console.log(`failed to connect to database: ${error}`));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./configs/passport.config')
require('./configs/google')
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);


app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/user', require('./routes/user.routes'));
app.use('/api/v1/store', require('./routes/store.routes'));
app.use('/api/v1/product', require('./routes/product.routes'));
app.use('/api/v1/order', require('./routes/order.routes'));

module.exports = app;
