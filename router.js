const UserModel = require('./models/user');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  // app.get('/', (req, res) => {
  //   res.send({ message: 'http GET is working' });
  // });

  app.post('/login', (req, res) => {
    const { username } = req.body;
    UserModel.create({ username }, err => {
      if(err) return console.error("UserModel", err);
      
      res.send({ username });
    });
  });
}
