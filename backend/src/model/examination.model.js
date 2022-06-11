const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const idvalidator = require('mongoose-id-validator');

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
    required: true,
  },
}, {
  timestamps: true,
});

examinationSchema.plugin(softDelete);
examinationSchema.plugin(idvalidator);

module.exports = mongoose.model('Examination', examinationSchema);
