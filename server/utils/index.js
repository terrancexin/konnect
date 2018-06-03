const MessageModel = require('../models/message');
const UserModel = require('../models/user');
const { USER_DISCONNECTED } = require('../../constants');

const disconnectUser = (socket, user) => {
  const { username } = user;

  MessageModel.findOne({}, {}, { sort: { _id: -1 } })
    .then((message) => {
      const { id } = message;

      return UserModel.update(
        { username },
        { bookMark: message ? id : '', onlineStatus: false },
      );
    })
    .then(() => UserModel.find({}))
    .then((users) => {
      const updatedUsers = users.map((_user) => {
        const { id, onlineStatus } = _user;

        return ({ id, username: _user.username, onlineStatus });
      });

      socket.broadcast.emit(USER_DISCONNECTED, {
        users: updatedUsers,
        notice: `Bye ${username}! Come back soon!🥂`,
      });
    })
    .catch((err) => {
      console.log(`disconnectUser failed: ${err}`);
    });
};

const validateInputInfo = (username, password, passwordConfirmation) => {
  if (!username) {
    return 'hey, enter something!';
  }

  if (username === 'username') {
    return 'c\'mon, be more creative than that!';
  }

  if (username.length > 15 || password.length > 15) {
    return '15 characters max for all inputs';
  }

  if (!password) {
    return 'password can\'t be blank';
  }

  if (!passwordConfirmation) {
    return 'please confirm your password';
  }

  if (password !== passwordConfirmation) {
    return 'passwords do not match';
  }
};

module.exports = {
  disconnectUser,
  validateInputInfo,
};
