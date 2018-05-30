const jwt = require('jwt-simple');
const MessageModel = require('../models/message');
const UserModel = require('../models/user');

const mySecretJwtKey = process.env.SECRET_JWT_KEY || 'secret dev jwt';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, mySecretJwtKey);
};

const logInUser = (req, res) => {
  const { username } = req.body;

  UserModel.update({ username }, { onlineStatus: true }, (updateUserError) => {
    if (updateUserError) {
      return console.log(`updating user's online status failed: ${updateUserError}`);
    }

    UserModel.findOne({ username }, (findUserError, updatedUser) => {
      if (findUserError) {
        return console.log(`finding a user from login failed: ${findUserError}`);
      }

      const { bookMark } = updatedUser;
      const missedMsg = [];

      if (!bookMark) {
        return res.send({
          missedMsg,
          newUser: updatedUser,
          token: tokenForUser(updatedUser),
        });
      }

      MessageModel.find({}, (messageModelError, messages) => {
        if (messageModelError) {
          return console.log(`fetching all msgs in login failed: ${messageModelError}`);
        }

        let tracker = messages.length - 1;

        if (tracker < 1) {
          return res.send({
            missedMsg,
            newUser: updatedUser,
            token: tokenForUser(updatedUser),
          });
        }

        while (
          tracker >= 0 &&
          String(messages[tracker].id) !== String(bookMark)
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
      });
    });
  });
};

const signUpUser = (req, res, next) => {
  const { avatar, username, password, passwordConfirmation } = req.body;

  if (!username) {
    return res.send({ error: 'hey, enter something!' });
  }

  if (username === 'username') {
    return res.send({ error: 'c\'mon, be more creative than that!' });
  }

  if (username.length < 3) {
    return res.send({ error: '3 characters minimum' });
  }

  if (username.length > 15) {
    return res.send({ error: '15 characters max' });
  }
  if (password.length > 15) {
    return res.send({ error: 'password has exceeded the character limit' });
  }
  if (passwordConfirmation.length > 15) {
    return res.send({ error: 'password has exceeded the character limit' });
  }

  if (!password) {
    return res.send({ error: "password can't be blank" });
  }

  if (!passwordConfirmation) {
    return res.send({ error: 'please confirm your password' });
  }

  if (password !== passwordConfirmation) {
    return res.send({ error: 'passwords do not match' });
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
      bookMark: '',
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
