require('dotenv').load();

const config = {};
config.twitter = {};

config.port = process.env.PORT || 3001;
config.dbHost = process.env.DB_HOST || 'mongodb://localhost/fcc_dwap';
config.jwtSecret = process.env.JWT_SECRET || 'superSecretKey12';
config.twitter.consumerKey = process.env.TWITTER_CONSUMER_KEY;
config.twitter.consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

module.exports = config;
