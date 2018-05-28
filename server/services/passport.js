const LocalStrategy = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('../models/user');

const mySecretJwtKey = process.env.SECRET_JWT_KEY || 'secret dev jwt';

const localLogin = new LocalStrategy((username, password, done) => {
  UserModel.findOne({ username }, (findUserError, user) => {
    if (findUserError) {
      return done(findUserError);
    }
    if (!user) {
      return done(null, false);
    }

    user.validatePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: mySecretJwtKey,
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  UserModel.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

module.exports = {
  jwtLogin,
  localLogin,
};
