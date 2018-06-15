const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// connect to the database and load models
require('./models').open(config.dbHost, config.appName);

const app = express();
app.set('port', config.port);

// Set up logger
app.use(morgan('combined'));

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

const mainRouter = new express.Router();
app.use(config.basePath, mainRouter);

// Inject local use middleware
mainRouter.use(require('./middleware/jwt-user'));

// Set up routes
mainRouter.use('/auth', require('./routes/twitter'));
mainRouter.use('/auth', require('./routes/auth'));
mainRouter.use('/api', require('./routes/polls'));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  mainRouter.use(express.static(path.join(__dirname, 'static')));
  mainRouter.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
  });
}

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`); // eslint-disable-line no-console
});
