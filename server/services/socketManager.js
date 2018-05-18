const io = require('../index').io;
const {
  USER_CONNECTED,
  USER_DISCONNECTED,
  TYPING,
  STOPPED_TYPING,
  LOGOUT,
  MESSAGE_SENT,
} = require('../../constants');
const OpenUserModel = require('../models/openUser');

module.exports = socket => {
  socket.on(USER_CONNECTED, user => {
    io.emit(USER_CONNECTED, { user, notice: `${user.username} has joined Konnect 🔥`});
    
    socket.on('disconnect', () => {
      console.log(`${user.username} has disconnected by browser`);
      const { username } = user;
      
      OpenUserModel.findOneAndDelete({ username }, err => {
        if (err) console.log('remove user failed');
      });
      
      io.emit(USER_DISCONNECTED, { user, notice: `Bye ${user.username}! Come back soon!🥂`});
    });
  })
  
  socket.on(LOGOUT, user => {
    console.log(`${user.username} has disconnected by manual logout`);
    const { username } = user;
    
    OpenUserModel.findOneAndDelete({ username }, err => {
      if (err) console.log('remove user failed');
    });

    io.emit(USER_DISCONNECTED, user);
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