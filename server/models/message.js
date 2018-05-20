const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date: { type: Date },
  text: String,
  username: String
});

module.exports = mongoose.model('message', MessageSchema);
