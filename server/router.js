const UserModel = require('./models/user');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
  });

  app.post('/login', (req, res) => {
    const { username } = req.body;
    UserModel.create({ username }, err => {
      if (err) return console.error('UserModel', err);

      res.send({ username });
    });
  });
};
