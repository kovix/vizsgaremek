const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');
const idvalidator = require('mongoose-id-validator');

const patientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A vezetéknév megadása kötelező'],
  },
  lastName: {
    type: String,
    required: [true, 'A keresztnév megadása kötelező!'],
  },
  patientID: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => /^$|^\d{3} \d{3} \d{3}$/.test(value),
      message: 'A TAJ szám érvénytelen!',
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => /^$|^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value),
      message: 'A megadott E-mail cím érvénytelen!',
    },
  },
  comment: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
}, {
  timestamps: true,
});

patientSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
patientSchema.plugin(idvalidator);

module.exports = mongoose.model('Patient', patientSchema);
