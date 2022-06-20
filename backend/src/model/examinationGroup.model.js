const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const examinationGroupSchema = mongoose.Schema({
  name: {
    type: String,
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
        ref: 'examinations',
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

examinationGroupSchema.plugin(idvalidator);

module.exports = mongoose.model('Examination', examinationGroupSchema);
