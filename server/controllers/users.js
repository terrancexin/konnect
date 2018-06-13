const jwt = require('jwt-simple');
const MessageModel = require('../models/message');
const UserModel = require('../models/user');
const { validateInputInfo } = require('../utils');

const mySecretJwtKey = process.env.SECRET_JWT_KEY || 'secret dev jwt';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, mySecretJwtKey);
};

const logInUser = (req, res) => {
  const { username } = req.body;
  const missedMsg = [];
  let updatedUser;

  UserModel.update({ username }, { onlineStatus: true })
    .then(() => UserModel.findOne({ username }))
    .then((_updatedUser) => {
      updatedUser = _updatedUser;

      if (!updatedUser.bookMark) {
        return Promise.resolve([]);
      }

      return MessageModel.find({}).sort({ date: 'asc' });
    })
    .then((messages) => {
      let tracker = messages.length - 1;

      while (
        tracker >= 0 &&
        String(messages[tracker].id) !== String(updatedUser.bookMark)
        && messages[tracker].username !== username
      ) {
        missedMsg.unshift(messages[tracker]);
        tracker -= 1;
      }

      return res.send({
        missedMsg,
        newUser: updatedUser,
        token: tokenForUser(updatedUser),
      });
    })
    .catch((err) => {
      console.log(`log in user failed: ${err}`);
    });
};

const signUpUser = (req, res, next) => {
  const { avatar, username, password, passwordConfirmation } = req.body;
  const error = validateInputInfo(username, password, passwordConfirmation);

  if (error) {
    return res.send({ error });
  }

  UserModel.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.send({ error: `${username} is already taken!` });
    }

    const newUser = new UserModel({
      avatar,
      bookMark: null,
      onlineStatus: true,
      password,
      username,
    });

    newUser.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }

      res.json({
        missedMsg: [],
        newUser,
        token: tokenForUser(newUser),
      });
    });
  });
};

const removeBookMark = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.send({ error: 'username not found, cannot remove bookmark' });
  }

  UserModel.update({ username }, { bookMark: '' }, (updateUserError) => {
    if (updateUserError) {
      return console.log(`updating user's online status failed: ${updateUserError}`);
    }

    return res.send({ success: 'bookmark successfully removed' });
  });
};

module.exports = {
  logInUser,
  removeBookMark,
  signUpUser,
};
