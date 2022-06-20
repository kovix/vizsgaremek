const Examination = require('../../model/examination.model');

module.exports = {
  findAll: () => Examination.find({}).populate('createdBy'),
  findById: (id) => Examination.findById(id).populate('createdBy'),
  create: (properties) => {
    const newExamination = new Examination(properties);
    return newExamination.save();
  },
  update: (id, properties) => {
    const filter = { _id: id };
    return Examination.findOneAndUpdate(filter, properties, { new: true });
  },
  remove: async (id, userId) => {
    const record = await Examination.findById(id);
    if (!record) return false;
    return record.delete(userId);
  },
};
