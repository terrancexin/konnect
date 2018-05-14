module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ message: 'http GET is working' });
  });

  app.post('/login', (req, res) => {
    const { username } = req.body;
    res.send({ message: 'http POST is working' });
  });
}
