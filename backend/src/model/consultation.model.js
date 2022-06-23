const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const consultationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExaminationGroup',
    required: true,
  },
  examinations: [
    {
      order: {
        type: Number,
        required: true,
      },
      examination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Examination',
        required: true,
      },
    },
  ],
  consultationDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ConsultationDetail',
      required: true,
    },
  ],
  logEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Log',
      required: true,
    },
  ],

}, {
  timestamps: true,
});

consultationSchema.plugin(idvalidator);

module.exports = mongoose.model('Consultation', consultationSchema);
