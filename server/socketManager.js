module.exports = socket => {
  console.log('a user still connected?');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
};
