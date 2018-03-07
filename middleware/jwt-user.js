const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');

/**
 *  No authentication, just add user to request
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return next(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return next();
      }

      req.user = user;
      return next();
    });
  });
};
