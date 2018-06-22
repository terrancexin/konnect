const mongoose = require('mongoose');

const { Schema } = mongoose;

const PrivateMessageSchema = new Schema({
  date: { type: Date },
  text: String,
  userAvatar: String,
  username: String,
  imageMsg: String,
});

module.exports = mongoose.model('privateMessage', PrivateMessageSchema);
