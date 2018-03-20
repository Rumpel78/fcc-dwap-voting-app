/* eslint no-underscore-dangle: 0 */

const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  const userData = {
    username: req.body.username.trim(),
    password: password.trim(),
  };

  const newUser = new User(userData);
  newUser.save((err, user) => {
    const payload = {
      id: user._id,
    };

    // create a token string
    const token = jwt.sign(payload, config.jwtSecret);
    return done(null, token, user);
  });
});
