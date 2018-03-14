const expressJwt = require('express-jwt');

const Config = require('../config');

// token handling middleware
module.exports = (req, res) => expressJwt({
  secret: Config.jwtSecret,
  requestProperty: 'auth',
  getToken: (req) => {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});
