const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  bookMark: String,
  onlineStatus: Boolean,
  password: String,
  username: { type: String, lowercase: true, unique: true },
});

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    bcrypt.hash(user.password, salt, null, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validatePassword = function (candidatePassword, callback) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('user', UserSchema);
