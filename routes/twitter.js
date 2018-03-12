const express = require('express');
const passport = require('passport');

const router = new express.Router();
const Config = require('../config');
const { generateToken, sendToken } = require('../passport/token');
const request = require('request');

router.post('/reverse', (req, res) => {
  request.post({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
      oauth_callback: Config.twitterCallback,
      consumer_key: Config.twitterConsumerKey,
      consumer_secret: Config.twitterConsumerSecret,
    },
  }, (err, r, body) => {
    if (err) {
      return res.send(500, { message: err.message });
    }

    const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    res.send(JSON.parse(jsonStr));
  });
});

router.post('/', (req, res, next) => {
  request.post({
    url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
    oauth: {
      consumer_key: Config.twitterConsumerKey,
      consumer_secret: Config.twitterConsumerSecret,
      token: req.query.oauth_token,
    },
    form: { oauth_verifier: req.query.oauth_verifier }
  }, (err, r, body) => {
    if (err) {
      return res.send(500, { message: err.message });
    }

    console.log(body);
    const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    const parsedBody = JSON.parse(bodyString);

    req.body['oauth_token'] = parsedBody.oauth_token;
    req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
    req.body['user_id'] = parsedBody.user_id;

    next();
  });
}, (req, res, next) => {
  passport.authenticate('twitter-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
      id: req.user.id,
    };

    return next();
  };
}, (req, res, next) => {
  next();
});


module.exports = router;
