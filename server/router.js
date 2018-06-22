const passport = require('passport');
const { jwtLogin, localLogin } = require('./services/passport');
const { getMessages, sendMessage } = require('./controllers/messages');
const { getPrivateMessages, sendPrivateMessage } = require('./controllers/privateMessage');
const {
  logInUser,
  removeBookMark,
  signUpUser,
} = require('./controllers/users');

passport.use(jwtLogin);
passport.use(localLogin);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogIn = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // Users routes
  app.post('/bookmark', removeBookMark);
  app.post('/login', requireLogIn, logInUser);
  app.post('/signup', signUpUser);

  // Messages routes
  app.get('/messages', requireAuth, getMessages);
  app.get('/messages_private', requireAuth, getPrivateMessages);
  app.post('/send', sendMessage);
  app.post('/send_private', sendPrivateMessage);
};
