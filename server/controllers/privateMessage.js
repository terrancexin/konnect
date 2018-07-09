const SimpleCrypto = require('simple-crypto-js').default;
const PrivateMessageModel = require('../models/privateMessage');

const secretCryptoKey = process.env.SECRET_CRYPTO_KEY || 'private';
const simpleCrypto = new SimpleCrypto(secretCryptoKey);

const getPrivateMessages = (req, res, next) => {
  PrivateMessageModel.find({}).sort({ date: 'asc' }).exec((err, messages) => {
    if (err) return next(err);

    res.json(messages);
  });
};

const sendPrivateMessage = (req, res, next) => {
  const { userAvatar, username, text, date, imageMsg } = req.body;
  const encryptedText = simpleCrypto.encrypt(text);

  if (!username || !userAvatar || !date) {
    return res.send({ error: 'missing params in request' });
  }

  const message = new PrivateMessageModel({
    date,
    text: encryptedText,
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
  getPrivateMessages,
  sendPrivateMessage,
};
