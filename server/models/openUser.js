const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpenUserSchema = new Schema({
  username: String
});

module.exports = mongoose.model('openUser', OpenUserSchema);