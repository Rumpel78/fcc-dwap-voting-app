const express = require('express');
const passport = require('passport');
const request = require('request');
const config = require('../config');
const qs = require('querystring');

const router = new express.Router();
const { generateToken, sendToken } = require('../passport/tokenHelper');

router.post(
  '/twitter/verify',
  (req, res, next) => {
    request.post(
      {
        url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
        oauth: {
          token: req.query.oauth_token,
          consumer_key: config.twitter.consumerKey,
          consumer_secret: config.twitter.consumerSecret,
        },
        form: {
          oauth_verifier: req.query.oauth_verifier,
        },
      },
      (err, r, body) => {
        if (err) {
          return res.send(500, { message: err.message });
        }

        const parsedBody = qs.parse(body);

        req.body.oauth_token = parsedBody.oauth_token;
        req.body.oauth_token_secret = parsedBody.oauth_token_secret;
        req.body.user_id = parsedBody.user_id;

        return next();
      }
    );
  },
  passport.authenticate('twitter-token', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    return next();
  },
  generateToken,
  sendToken
);

router.post(
  '/twitter/reverse',
  (req, res) => {
    request.post(
      {
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          callback: `${req.protocol}://${req.headers.host}`,
          consumer_key: config.twitter.consumerKey,
          consumer_secret: config.twitter.consumerSecret,
        },
      },
      (err, r, body) => {
        if (err) {
          return res.send(500, { message: err.message });
        }

        const parsedBody = qs.parse(body);
        return res.send(parsedBody);
      }
    );
  }
);

module.exports = router;
