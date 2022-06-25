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
  logEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Log',
      required: true,
    },
  ],
  details: [
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
      },
      comment: {
        type: String,
      },
      arrived: {
        type: Date,
      },
      leaved: {
        type: Date,
      },
      // eslint-disable-next-line max-len
      lastUpdated: { // látszólag felesleges, de az updatedAt minden műveletre frissül, ez pedig csak akkor ha időadatok frissülnek.
        type: Date,
        requred: true,
      },
      patientConsultations: [
        {
          examinationID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Examination',
            required: true,
          },
          required: {
            type: Boolean,
            default: true,
          },
          startedAt: {
            type: Date,
          },
          finishedAt: {
            type: Date,
          },
          callRequied: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  closed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

consultationSchema.plugin(idvalidator);

module.exports = mongoose.model('Consultation', consultationSchema);
