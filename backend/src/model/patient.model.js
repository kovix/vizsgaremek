const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');
const idvalidator = require('mongoose-id-validator');

const validatePatientID = (patientID) => {
  const re = /^$|^\d{3} \d{3} \d{3}$/;
  return re.test(patientID);
};

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

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
    validate: [validatePatientID, 'A TAJ szám érvénytelen!'],
  },
  email: {
    type: String,
    validate: [validateEmail, 'A megadott E-mail cím érvénytelen!'],
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
