const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const consultationDetailSchema = mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    index: true,
  },
  examinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examination',
    required: true,
    index: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  startedAt: {
    type: Date,
  },
  finishedAt: {
    type: Date,
  },
  requiredForCall: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

consultationDetailSchema.plugin(idvalidator);

module.exports = mongoose.model('ConsultationDetails', consultationDetailSchema);
