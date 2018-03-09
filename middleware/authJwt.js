import expressJwt from 'express-jwt';

const Config = require('../config');

// token handling middleware
const authenticate = expressJwt({
  secret: Config.jwtSecret,
  requestProperty: 'auth',
  getToken: (req) => {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

;