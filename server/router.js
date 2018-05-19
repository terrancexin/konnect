const UsersController = require('./controllers/users');
const MessagesController = require('./controllers/messages');
const passportService = require('./services/passport');
const passport = require('passport');

const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/login', requireSignin, UsersController.login);
  app.post('/signup', UsersController.signup);
  app.get('/users', UsersController.fetchAll);
  
  app.get('/messages', MessagesController.fetch);
  app.post('/send', MessagesController.send);
};
