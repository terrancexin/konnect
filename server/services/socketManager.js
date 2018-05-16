const io = require('../index').io;
const { USER_JOINED, USER_DISCONNECTED } = require('../../constants');
const UserModel = require('../models/user');

module.exports = socket => {

  socket.on(USER_JOINED, username => {
    UserModel.findOne({ username }, (err, user) => {
      if (user) {
        io.emit(USER_JOINED, `${username} exists already`);
      } else {
        io.emit(USER_JOINED, 'show')
      }
    })
    
    
  });

  socket.on('disconnect', user => {

    // io.emit(USER_DISCONNECTED, connectedUsers);
  });
};
