const UserModel = require('./models/user');
const UsersController = require('./controllers/users');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
  });

  app.post('/login', (req, res, next) => {
    const { username } = req.body;
    
    UserModel.create({ username }, err => {
      if (err) return next(err);
      
      res.send({ username });
    });
  });
  app.post('/signup', (req, res, next) => {
    const { username } = req.body;
    
    if (!username) {
      return res.status(422).send({ error: 'You must provide username'});
    }
    
    UserModel.findOne({ username }, (err, user) => {
      if (err) return next(err);
      
      if (user) return res.status(422).send({ error: 'Username is in use' });
      
      const newUser = new UserModel({
        username
      });
      
      newUser.save(err => {
        if (err) return next(err);
        
        res.json(newUser);
      });
    });
  });
};
