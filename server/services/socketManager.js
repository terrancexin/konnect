const io = require('../index').io;
const {
  USER_CONNECTED,
  USER_DISCONNECTED,
  TYPING,
  FETCH_USERS,
  FETCH_MESSAGES,
  LOGIN_ERROR,
  LOGOUT,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
} = require('../../constants');
const OpenUserModel = require('../models/openUser');

const getTime = date => {
  return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
};

module.exports = socket => {
  socket.on(USER_CONNECTED, user => {
    console.log('on?');
    console.log(user);
    io.emit(USER_CONNECTED, user);
    
    socket.on('disconnect', () => {

      io.emit(USER_DISCONNECTED, user);
    });
  })
  
  socket.on(MESSAGE_SENT, data => {
    
    io.emit(MESSAGE_SENT, data);
  });
  
  socket.on(FETCH_USERS, data => {
    console.log('fetch users', data);
    
    io.emit(USER_CONNECTED, data.newUser);
  });
  
  socket.on(FETCH_MESSAGES, () => {

    io.emit(FETCH_MESSAGES, messages);
  });

  socket.on(LOGOUT, () => {

    io.emit(USER_DISCONNECTED, connectedUsers);
  });

  socket.on(TYPING, user => {
    
    io.emit(TYPING, user);
  });
};