const ExaminationGroup = require('../../model/examinationGroup.model');

module.exports = {
  findAll: () => ExaminationGroup.find({}).populate('examinations.examination'),

  findById: (id) => ExaminationGroup.findById(id).populate('examinations.examination'),

  create: (properties) => {
    const newExamination = new ExaminationGroup(properties);
    newExamination.examinations = [];
    return newExamination.save();
  },

  update: (id, properties) => {
    const filter = { _id: id };
    return ExaminationGroup.findOneAndUpdate(filter, properties, { new: true });
  },

  remove: async (id, userId) => {
    const record = await ExaminationGroup.findById(id);
    if (!record) return false;
    return record.delete(userId);
  },

};
