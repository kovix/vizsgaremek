const Patient = require('../../model/patient.model');

module.exports = {
  findAll: () => Patient.find({}).populate('createdBy'),

  findById: (id) => Patient.findById(id).populate('createdBy'),

  create: (properties) => {
    const newPatient = new Patient(properties);
    return newPatient.save();
  },

  update: (id, properties) => {
    const filter = { _id: id };
    return Patient.findOneAndUpdate(filter, properties, { new: true });
  },

  remove: async (id, userId) => {
    const record = await Patient.findById(id);
    if (!record) return false;
    return record.delete(userId);
  },
};
