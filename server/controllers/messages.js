const MessageModel = require('../models/message');

const fetch = (req, res, next) => {
  MessageModel.find({}).exec((err, messages) => {
    if (err) return next(err);

    res.json(messages);
  });
};

const send = (req, res, next) => {
  const { username, text, date } = req.body;

  if (!username || !text || !date) {
    return res.send({ error: 'missing params in request' });
  }

  const message = new MessageModel({
    username,
    text,
    date,
  });

  message.save((err) => {
    if (err) return next(err);
  });

  res.json(message);
};
module.exports = {
  fetch,
  send,
};
