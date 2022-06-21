const mongoose = require('mongoose');
const ExaminationGroup = require('../../model/examinationGroup.model');

const prepareExaminations = (examinations, shiftOrder) => {
  if (!Array.isArray(examinations)) return [];
  return examinations.map((exam, index) => ({ order: index + shiftOrder, examination: exam }));
};

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

  addExaminations: async (id, examinations) => {
    const record = await ExaminationGroup.findById(id);
    if (!record) return { error: true, message: 'Nincs ilyen csoport!' };
    let allValid = true;
    examinations.forEach((newId) => {
      const newObjId = new mongoose.mongo.ObjectId(newId);
      const existingRecord = record.examinations.find((obj) => obj.examination.equals(newObjId));
      if (existingRecord) allValid = false;
    });
    if (!allValid) return { error: true, message: 'A lista tartalmaz olyan vizsgálatot, amely már létezik a vizsgálatban.' };

    const nextOrder = record.examinations
      .reduce((prev, current) => {
        if (current.order > prev?.order) return current.order;
        return prev?.order;
      }, 0) + 1;
    record.examinations = [...record.examinations, ...prepareExaminations(examinations, nextOrder)];
    const result = await ExaminationGroup.findByIdAndUpdate(id, record, { new: true });
    if (result) {
      // eslint-disable-next-line no-underscore-dangle
      const fullRecord = await ExaminationGroup.findById(result._id).populate('examinations.examination');
      return fullRecord;
    }

    return { error: true, message: 'Ismeretlen hiba történt a művelet során!' };
  },

};
