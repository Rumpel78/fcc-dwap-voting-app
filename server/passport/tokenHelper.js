const jwt = require('jsonwebtoken');
const Config = require('../config/config.json');

const createToken = auth =>
  jwt.sign({ id: auth.id }, Config.jwtSecret);


module.exports = {

  generateToken: (req, res, next) => {
    // prepare token for API
    req.auth = {
      id: req.user.id,
    };

    req.token = createToken(req.auth);
    return next();
  },

  sendToken: (req, res) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
};
