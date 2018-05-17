const MessageModel = require('../models/message');

const fetch = (req, res, next) => {
  MessageModel.find({}, (err, messages) => {
    if (err) return next(err);
    
    res.json({ messages });
  });
};

const send = (req, res, next) => {
  const { username, text, date } = req.body;

  if (!username || !text || !date) {
    return res.send({ error: 'username is missing' });
  }
  
  const message = new MessageModel({
    username,
    text,
    date
  });
  
  message.save(err => {
    if (err) return next(err);
  });

  res.json(message);
}
module.exports = {
  fetch,
  send
};
