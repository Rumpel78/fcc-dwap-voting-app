const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('mongoose').model('User');
const Config = require('../config');

module.exports = () => {
  passport.use(new TwitterTokenStrategy(
    {
      consumerKey: Config.twitterConsumerKey,
      consumerSecret: Config.twitterConsumerSecret,
    },
    function (token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }));
};

