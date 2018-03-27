const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');

/**
 *  No authentication, just add user to request
 */
module.exports = (req, res, next) => {
  if (!req.headers['x-auth-token']) {
    return next();
  }
  // get token from header
  const token = req.headers['x-auth-token'];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return next(); }

    const userId = decoded.id;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return next();
      }

      req.user = { username: user.username };
      return next();
    });
  });
};
