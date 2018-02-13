const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const morgan = require('morgan');

// connect to the database and load models
require('./models').open(config.dbUri);

const app = express();
app.set('port', process.env.PORT || 3001);

// Set up logger
app.use(morgan('combined'));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');

app.use('/api', authCheckMiddleware);

// Set up routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const pollRoutes = require('./routes/polls');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', pollRoutes);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
