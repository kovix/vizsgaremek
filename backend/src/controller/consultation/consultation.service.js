const Consultation = require('../../model/consultation.model');

const consultationPopulate = ['doctor', 'groupId', 'examinations.examination', 'logEntries'];

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

  remove: async (id, userId) => {
    const record = await Consultation.findById(id);
    if (!record) return false;
    return record.delete(userId);
  },
};
