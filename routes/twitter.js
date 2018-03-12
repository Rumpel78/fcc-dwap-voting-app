const express = require('express');
const passport = require('passport');
const request = require('request');
const config = require('../config');
var qs = require('querystring')

const router = new express.Router();
const tokenRegex = 'oauth_token="(.+?)"';

router.post(
  '/twitter/token',
  passport.authenticate('twitter-token'),
  (req, res) => res.send(req.user ? 200 : 401),
);

router.post(
  '/twitter/reverse',
  (req, res) => {
    request.post(
      {
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          oauth_callback: config.twitterCallback,
          consumer_key: config.twitterConsumerKey,
          consumer_secret: config.twitterConsumerSecret,
        },
        form: { x_auth_mode: 'reverse_auth' },
      },
      (err, r, body) => {
        if (err) {
          return res.send(500, { message: err.message });
        }

        if (body.indexOf('OAuth') !== 0) {
          return res.send(500, { message: 'Malformed response from Twitter' });
        }

        const oauth_token = body.match(tokenRegex)[1];
        res.send({ oauth_token });
      },
    );
  },
);

module.exports = router;
