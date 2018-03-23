const mongoose = require('mongoose');

// define the User model schema
const PollSchema = new mongoose.Schema({
  name: String,
  createdBy: String,
  options: [ { name: String, count: Number } ],
  voted: [ { id: String } ],
});

module.exports = mongoose.model('Poll', PollSchema);
