const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const morgan = require('morgan');
const cors = require('cors');

// connect to the database and load models
require('./models').open(config.dbUri);

const app = express();
app.set('port', process.env.PORT || 3001);

// Set up logger
app.use(morgan('combined'));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use(express.static('static'));
}

// enable cors
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: [ 'x-auth-token' ],
};
app.use(cors(corsOption));

// tell the app to parse HTTP body messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport
// passport twitter strategy
const passportConfig = require('./passport/twitter-token-strategy');

passportConfig();

// passport local strategy
passport.use('local-signup', require('./passport/local-signup'));
passport.use('local-login', require('./passport/local-login'));

app.use(passport.initialize());

// Inject local use middleware
app.use(require('./middleware/jwt-user'));

// Set up routes
app.use('/auth', require('./routes/twitter'));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/polls'));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
