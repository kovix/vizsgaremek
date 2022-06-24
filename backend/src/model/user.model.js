const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const softDelete = require('mongoose-delete');
const idvalidator = require('mongoose-id-validator');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  role: {
    type: Number,
    required: true,
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// eslint-disable-next-line consistent-return
userSchema.pre('save', function userSchemaPreSave(next) {
  let rounds = parseInt(process.env.SALT_WORK_FACTOR || 10, 10);
  if (Number.isNaN(rounds)) rounds = 10;

  const user = this;
  if (!user.isModified('password')) return next();

  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(rounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(err);

      user.password = hash;
      return next();
    });
  });
});

// eslint-disable-next-line consistent-return
userSchema.pre('update', function userSchemaPreUpdate(next) {
  let rounds = parseInt(process.env.SALT_WORK_FACTOR || 10, 10);
  if (Number.isNaN(rounds)) rounds = 10;

  const user = this;
  if (!user.isModified('password')) return next();

  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(rounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(err);

      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function userSchemaPreSaveComparePass(candidatePassword) {
  const validatorFunc = (resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    });
  };
  return new Promise(validatorFunc);
};

userSchema.plugin(softDelete, { deletedAt: true, deletedBy: true });
userSchema.plugin(idvalidator);

module.exports = mongoose.model('User', userSchema);
