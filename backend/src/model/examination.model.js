const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');
const idvalidator = require('mongoose-id-validator');
const User = require('./user.model');

const examinationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  defaultTime: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
}, {
  timestamps: true,
});

examinationSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
examinationSchema.plugin(idvalidator);

module.exports = mongoose.model('Examination', examinationSchema);
