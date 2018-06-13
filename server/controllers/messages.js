const MessageModel = require('../models/message');

const getMessages = (req, res, next) => {
  MessageModel.find({}).sort({ date: 'asc' }).exec((err, messages) => {
    if (err) return next(err);

    res.json(messages);
  });
};

const sendMessage = (req, res, next) => {
  const { userAvatar, username, text, date, imageMsg } = req.body;

  if (!username || !userAvatar || !date) {
    return res.send({ error: 'missing params in request' });
  }

  const message = new MessageModel({
    date,
    text,
    userAvatar,
    username,
    imageMsg,
  });

  message.save((err) => {
    if (err) return next(err);

    res.json(message);
  });
};

module.exports = {
  getMessages,
  sendMessage,
};
