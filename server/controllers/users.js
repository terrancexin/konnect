const jwt = require('jwt-simple');
const UserModel = require('../models/user');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, 'secret');
}

const login = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

const signup = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(422).send({ error: 'Username or Password is missing!'});
  }
  
  UserModel.findOne({ username }, (err, user) => {
    if (err) { return next(err); }
    
    if (user) { return res.status(422).send({ error: `${username} is taken!` }); }
    
    const newUser = new UserModel({
      username,
      password
    });
    
    newUser.save(err => {
      if (err) { return next(err); }
      
      res.json({ token: tokenForUser(newUser) });
    });
  });
}

module.exports = {
  login,
  signup
};

