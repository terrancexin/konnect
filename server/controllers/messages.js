const MessageModel = require('../models/message');

const fetch = (req, res, next) => {
  MessageModel.find({})
    .limit(200)
    .exec((err, messages) => {
      if (err) return next(err);
      
      if (!messages) return res.send({ error: 'error fetching messages'});

      res.json(messages);
    });
};

const send = (req, res, next) => {
  const { username, text, date } = req.body;

  if (!username || !text || !date) {
    return res.send({ error: 'missing requests' });
  }
  
  const message = new MessageModel({
    username,
    text,
    date
  });
  
  message.save(err => {
    if (err) return next(err);
  })

  res.json(message);
}
module.exports = {
  fetch,
  send
};
