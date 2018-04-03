const mongoose = require('mongoose');

module.exports.open = (host, dbName) => {
  mongoose.connect(`mongodb://${host}/${dbName}`);
  // plug in the promise library:
  mongoose.Promise = global.Promise;


  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./user');
  require('./poll');
};
