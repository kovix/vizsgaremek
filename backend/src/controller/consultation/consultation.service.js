const Consultation = require('../../model/consultation.model');

const consultationPopulate = ['doctor', 'groupId', 'examinations.examination', 'details.patient', 'logEntries'];

module.exports = {
  findAll: () => Consultation.find({}).populate(consultationPopulate),

  findById: (id) => Consultation.findById(id).populate(consultationPopulate),

  create: (properties) => {
    const newConsultation = new Consultation(properties);
    return newConsultation.save();
  },

  update: (id, properties) => {
    const filter = { _id: id };
    return Consultation.findOneAndUpdate(filter, properties, { new: true });
  },

  addPatients: async (id, patientsArr) => {
    const result = await Consultation.updateOne(
      { _id: id },
      { $addToSet: { details: patientsArr } },
    );
    return Consultation.findById(id).populate(consultationPopulate);
  },

  remove: async (id, userId) => {
    const record = await Consultation.findById(id);
    if (!record) return false;
    return record.delete(userId);
  },
};
