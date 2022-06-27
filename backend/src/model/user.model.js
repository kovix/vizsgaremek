const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt')
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
    bcrypt: true,
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
    required: false,
    validate: {
      validator: (value) => /^$|^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value),
      message: 'A megadott E-mail cím érvénytelen!',
    },
    index: {
      unique: true,
      sparse: true
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

let cryptRounds = parseInt(process.env.SALT_WORK_FACTOR || 10, 10);
if (Number.isNaN(cryptRounds)) cryptRounds = 10;

userSchema.plugin(bcrypt, { rounds: cryptRounds });
userSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
userSchema.plugin(idvalidator);

module.exports = mongoose.model('User', userSchema);
