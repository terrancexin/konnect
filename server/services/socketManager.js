const { io } = require('../index');
const {
  LOGOUT,
  MESSAGE_SENT,
  STOPPED_TYPING,
  TYPING,
  USER_CONNECTED,
  USER_DISCONNECTED,
} = require('../../constants');
const MessageModel = require('../models/message');
const UserModel = require('../models/user');

module.exports = (socket) => {
  socket.on(USER_CONNECTED, (user) => {
    console.log(`${user.username} connected`);

    UserModel.find({}, (err, users) => {
      if (err) {
        return console.log(`socket connected fetch all users failed: ${err}`);
      }

      const newUsersList = users.map((eachUser) => {
        const { id, username, onlineStatus } = eachUser;

        return ({
          id,
          username,
          onlineStatus,
        });
      });

      io.emit(USER_CONNECTED, {
        users: newUsersList,
        notice: `${user.username} has joined Konnect 🔥`,
      });
    });

    socket.on('disconnect', () => {
      console.log(`${user.username} has disconnected`);

      MessageModel.findOne({}, {}, { sort: { _id: -1 } }, (err, message) => {
        if (err) {
          return console.log(`finding the last seen msg by user failed: ${err}`);
        }

        UserModel.update(
          { username: user.username },
          { bookMark: message ? message.id : '', onlineStatus: false },
          (updateUserError) => {
            if (updateUserError) {
              return console.log(`updating user's book mark failed: ${updateUserError}`);
            }

            UserModel.find({}, (findUserError, users) => {
              if (findUserError) {
                return console.log(`socket disconnect finding user failed: ${findUserError}`);
              }

              const newUsersList = users.map((eachUser) => {
                const { id, username, onlineStatus } = eachUser;

                return ({
                  id,
                  username,
                  onlineStatus,
                });
              });

              socket.broadcast.emit(USER_DISCONNECTED, {
                users: newUsersList,
                notice: `Bye ${user.username}! Come back soon!🥂`,
              });
            });
          },
        );
      });
    });
  });

  socket.on(LOGOUT, (username) => {
    console.log(`${username} has disconnected`);

    MessageModel.findOne({}, {}, { sort: { _id: -1 } }, (err, message) => {
      if (err) {
        return console.log(`finding the last seen msg by user failed: ${err}`);
      }

      UserModel.update(
        { username },
        { bookMark: message ? message.id : '', onlineStatus: false },
        (updateUserError) => {
          if (updateUserError) {
            return console.log(`updating user's book mark failed: ${updateUserError}`);
          }

          UserModel.find({}, (findUserError, users) => {
            if (findUserError) {
              return console.log(`socket disconnect finding user failed: ${findUserError}`);
            }

            const newUsersList = users.map((eachUser) => {
              const { id, onlineStatus } = eachUser;

              return ({
                id,
                username: eachUser.username,
                onlineStatus,
              });
            });

            socket.broadcast.emit(USER_DISCONNECTED, {
              users: newUsersList,
              notice: `Bye ${username}! Come back soon!🥂`,
            });
          });
        },
      );
    });
  });

  socket.on(MESSAGE_SENT, (data) => {
    io.emit(MESSAGE_SENT, data);
  });

  socket.on(TYPING, (username) => {
    socket.broadcast.emit(TYPING, username);
  });

  socket.on(STOPPED_TYPING, (username) => {
    io.emit(STOPPED_TYPING, username);
  });
};
