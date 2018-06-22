const { io } = require('../index');
const { disconnectUser } = require('../utils');
const {
  LOGOUT,
  MESSAGE_SENT,
  MESSAGE_SENT_PRIVATE,
  STOPPED_TYPING,
  TYPING,
  USER_CONNECTED,
} = require('../../constants');
const UserModel = require('../models/user');

module.exports = (socket) => {
  socket.on(USER_CONNECTED, (user) => {
    const { username } = user;
    console.log(`${username} connected`);

    UserModel.find({}, (err, users) => {
      if (err) {
        return console.log(`socket connected fetch all users failed: ${err}`);
      }

      const updatedUsers = users.map((_user) => {
        const { id, onlineStatus } = _user;

        return ({ id, username: _user.username, onlineStatus });
      });

      io.emit(USER_CONNECTED, {
        users: updatedUsers,
        notice: `${username} has joined Konnect 🔥`,
      });
    });

    socket.on('disconnect', () => {
      console.log(`${username} has disconnected`);
      disconnectUser(socket, user);
    });
  });

  socket.on(LOGOUT, (user) => {
    console.log(`${user.username} has disconnected`);
    disconnectUser(socket, user);
  });

  socket.on(MESSAGE_SENT, (data) => {
    io.emit(MESSAGE_SENT, data);
  });

  socket.on(MESSAGE_SENT_PRIVATE, (data) => {
    io.emit(MESSAGE_SENT_PRIVATE, data);
  });

  socket.on(TYPING, (username) => {
    socket.broadcast.emit(TYPING, username);
  });

  socket.on(STOPPED_TYPING, (username) => {
    io.emit(STOPPED_TYPING, username);
  });
};
