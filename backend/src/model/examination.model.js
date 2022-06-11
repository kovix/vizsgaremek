const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete')

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

module.exports = mongoose.model('Examination', examinationSchema);
