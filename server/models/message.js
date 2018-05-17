const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date: { type: Date },
  text: { type: String },
  username: { type: String }
});

module.exports = mongoose.model('message', MessageSchema);
