const jwt = require('jwt-simple');
const MessageModel = require('../models/message');
const UserModel = require('../models/user');

// Would extract `mySecretJwtKey` into a file and not push the file into github
// declared here for demo purposes
const mySecretJwtKey = 'my secret';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, mySecretJwtKey);
};

const fetchAll = (req, res, next) => {
  UserModel.find({}).exec((err, users) => {
    if (err) return next(err);

    res.json(users);
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  UserModel.update({ username }, { onlineStatus: true }, (updateUserError) => {
    if (updateUserError) {
      return console.log(`updating user's online status failed: ${updateUserError}`);
    }

    UserModel.findOne({ username }, (findUserError, updatedUser) => {
      if (findUserError) {
        return console.log(`finding a user from login failed: ${findUserError}`);
      }

      if (updatedUser.bookMark) {
        MessageModel.find({}, (messageModelError, messages) => {
          if (messageModelError) {
            return console.log(`fetching all msgs in login failed: ${messageModelError}`);
          }

          let tracker = messages.length - 1;
          const missedMsg = [];
          const { bookMark } = updatedUser;
          console.log(bookMark);

          if (tracker >= 0) {
            while (
              tracker >= 0 &&
              String(messages[tracker]._id) !== String(bookMark)
              && messages[tracker].username !== username
            ) {
              missedMsg.unshift(messages[tracker]);
              tracker--;
            }
            res.send({
              token: tokenForUser(updatedUser),
              newUser: updatedUser,
              missedMsg,
            });
          } else {
            res.send({
              token: tokenForUser(updatedUser),
              newUser: updatedUser,
              missedMsg,
            });
          }
        });
      } else {
        res.send({
          token: tokenForUser({ username, password }),
          newUser: { username, password },
          missedMsg: [],
        });
      }
    });
  });
};

const signup = (req, res, next) => {
  const { username, password, passwordConfirmation } = req.body;

  if (!username) {
    return res.send({ error: 'hey, enter something!' });
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
      username,
      password,
      bookMark: '',
      onlineStatus: true,
    });

    newUser.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }
    });

    res.json({
      token: tokenForUser(newUser),
      missedMsg: [],
      newUser,
    });
  });
};

const removeBookMark = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.send({ error: 'username not found, cannot remove bookmark' });
  }

  UserModel.update({ username }, { bookMark: null }, (updateUserError) => {
    if (updateUserError) {
      return console.log(`updating user's online status failed: ${updateUserError}`);
    }

    return res.send({ success: 'bookmark successfully removed' });
  });
};

module.exports = {
  fetchAll,
  login,
  removeBookMark,
  signup,
};
