const passport = require('passport');
const { jwtLogin, localLogin } = require('./services/passport');
const { getMessages, sendMessage } = require('./controllers/messages');
const {
  getUsers,
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
  app.get('/users', requireAuth, getUsers);

  // Messages routes
  app.get('/messages', requireAuth, getMessages);
  app.post('/send', sendMessage);
};
