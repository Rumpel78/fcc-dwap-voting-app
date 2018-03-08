const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const morgan = require('morgan');
const { Strategy } = require('passport-twitter');

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

// passport
// passport local strategies
passport.use('local-signup', require('./passport/local-signup'));
passport.use('local-login', require('./passport/local-login'));
passport.use(new Strategy({
  consumerKey: config.twitterConsumerKey,
  consumerSecret: config.twitterConsumerSecret,
  callbackURL: config.twitterCallback,
}, (token, tokenSecret, profile, done) => done(null, profile)));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// passport twitter strategies
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

// Inject local use middleware
app.use(require('./middleware/jwt-user'));

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
