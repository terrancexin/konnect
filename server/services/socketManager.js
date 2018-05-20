const io = require('../index').io;
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

module.exports = socket => {
  socket.on(USER_CONNECTED, user => {
    console.log(`${user.username} connected`);
    
    socket.broadcast.emit(USER_CONNECTED, { user, notice: `${user.username} has joined Konnect 🔥`});
    
    socket.on('disconnect', () => {
      console.log(`${user.username} has disconnected`);
    
      MessageModel.findOne({}, {}, { sort: {'_id': -1}}, (err, message) => {
        UserModel.update({username: user.username}, {bookMark: message._id }, (err, updateUser) =>{    
        });
      });

      socket.broadcast.emit(USER_DISCONNECTED, { username: user.username, notice: `Bye ${user.username}! Come back soon!🥂` });
    });
  })
  
  socket.on(LOGOUT, username => {
    console.log(`${username} has disconnected`);
    
    MessageModel.findOne({}, {}, { sort: {'_id': -1}}, (err, message) => {
      UserModel.update({ username }, {bookMark: message._id }, (err, updateUser) =>{    
      });
    });

    socket.broadcast.emit(USER_DISCONNECTED, { username, notice: `Bye ${username}! Come back soon!🥂` });
  });
  
  socket.on(MESSAGE_SENT, data => {

    io.emit(MESSAGE_SENT, data);
  });
  
  socket.on(TYPING, username => {
    
    socket.broadcast.emit(TYPING, username);
  });
  
  socket.on(STOPPED_TYPING, username => {
    
    io.emit(STOPPED_TYPING, username);
  });
};