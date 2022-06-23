const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const logSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventText: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

logSchema.plugin(idvalidator);

module.exports = mongoose.model('Log', logSchema);
