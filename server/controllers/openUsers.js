const OpenUserModel = require('../models/openUser');

const fetchAll = (req, res, next) => {
  OpenUserModel.find({})
    .exec((err, users) => {
      if (err) return next(err);
      if (!users) return res.send({ error: 'error fetching all users'});

      res.json(users);
    });
};

const login = (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    return res.send({ error: 'hey, enter something!' });
  }

  if (username.length < 3) {
    return res.send({ error: '3 characters minimum' });
  }

  if (username.length > 15 ) {
    return res.send({ error: '15 characters max' });
  }

  OpenUserModel.findOne({ username }, (err, user) => {
    if (err) return next(err);

    if (user) {
      return res.send({ error: `${username} is taken!` });
    }

    const newUser = new OpenUserModel({ username });

    newUser.save(err => {
      if (err) return next(err);
    });

    res.json({ newUser, auth: true });
  });
};

const removeUser = (req, res, next) => {
  const { username } = req.body;
  
  OpenUserModel.findOneAndDelete({ username }, err => {
    if (err) return res.send({ error: 'remove user failed'});
    res.send(`${username} has left the chatroom.`);
  });
}

module.exports = {
  login,
  fetchAll,
  removeUser
};
