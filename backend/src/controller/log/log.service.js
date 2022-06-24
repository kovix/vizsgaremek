const LogModel = require('../../model/log.model');

module.exports = {
  create: (properties) => {
    const newLogEntry = new LogModel(properties);
    return newLogEntry.save();
  },

};
