const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },
  twitterProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
  password: String,
  name: {
    type: String,
    trim: true,
  },
});

UserSchema.statics.upsertTwitterUser = function (token, tokenSecret, profile, cb) {
  const that = this;
  return this.findOne({
    'twitterProvider.id': profile.id,
  }, function (err, user) {
    // no user was found, lets create a new one
    if (!user) {
      const newUser = new that({
        email: profile.emails[0].value,
        name: profile.username,
        twitterProvider: {
          id: profile.id,
          token,
          tokenSecret,
        },
      });

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    }
    return cb(err, user);
  });
};
/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);
