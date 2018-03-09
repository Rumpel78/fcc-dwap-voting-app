const jwt = require('jsonwebtoken');
const Config = require('../config');

const createToken = auth =>
  jwt.sign({ id: auth.id }, Config.jwtSecret, { expiresIn: 60 * 120 });


const generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};
