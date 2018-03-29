const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('mongoose').model('User');
const Config = require('../config');

module.exports = () => {
  passport.use(new TwitterTokenStrategy(
    {
      consumerKey: Config.twitter.consumerKey,
      consumerSecret: Config.twitter.consumerSecret,
      includeEntities: false,
    },
    (token, tokenSecret, profile, done) => {
      User.upsertTwitterUser(token, tokenSecret, profile, (err, user) => {
        if (err) {
          return done(err);
        }
        return done(err, user);
      });
    }
  ));
};

