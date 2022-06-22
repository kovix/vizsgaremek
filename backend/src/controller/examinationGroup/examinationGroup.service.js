const mongoose = require('mongoose');
const createError = require('http-errors');
const ExaminationGroup = require('../../model/examinationGroup.model');
const { createErrorObj } = require('../base/service');

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
    if (!record) return createErrorObj(new createError.NotFound('Nincs ilyen csoport!'));
    let allValid = true;
    examinations.forEach((newId) => {
      const newObjId = new mongoose.mongo.ObjectId(newId);
      const existingRecord = record.examinations.find((obj) => obj.examination?.equals(newObjId));
      if (existingRecord) allValid = false;
    });
    if (!allValid) return createErrorObj(new createError.BadRequest('A lista tartalmaz olyan vizsgálatot, amely már létezik a vizsgálatban.'));

    const nextOrder = record.examinations
      .map((obj) => obj.order)
      .reduce((prev, current) => {
        if (current > prev) return current;
        return prev;
      }, 0) + 1;
    record.examinations = [...record.examinations, ...prepareExaminations(examinations, nextOrder)];
    const result = await ExaminationGroup.findByIdAndUpdate(id, record, { new: true });
    if (result) {
      // eslint-disable-next-line no-underscore-dangle
      const fullRecord = await ExaminationGroup.findById(result._id).populate('examinations.examination');
      return fullRecord;
    }

    return createErrorObj(new createError.InternalServerError('Ismeretlen hiba történt a művelet során'));
  },

  reorderExaminations: async (id, examinations) => {
    const dbExaminations = prepareExaminations(examinations, 0);
    let result;
    try {
      result = await ExaminationGroup.updateOne(
        { _id: id },
        {
          $set: {
            examinations: dbExaminations,
          },
        },
        { safe: true },
      );
      if (result?.modifiedCount !== 1) return createErrorObj(new createError.NotFound('A vizsgálat csoport nem található!'));
      const fullRecord = await ExaminationGroup.findById(id).populate('examinations.examination');
      return fullRecord;
    } catch (error) {
      return createErrorObj(new createError.InternalServerError(`Hiba történt a vizsgálatok átrendezése közben! (${error.message})`));
    }
  },

  removeExamination: async (id, examinationId) => {
    try {
      const result = await ExaminationGroup.updateOne(
        { _id: id },
        {
          $pull: {
            examinations: { examination: examinationId },
          },
        },
        { safe: true },
      );
      if (!result?.matchedCount) return createErrorObj(new createError.NotFound('A csoport nem található!'));
      if (!result?.modifiedCount) return createErrorObj(new createError.BadRequest('A vizsgálat nem található a csoportban!'));
      const fullRecord = await ExaminationGroup.findById(id).populate('examinations.examination');
      return fullRecord;
    } catch (error) {
      return createErrorObj(new createError.InternalServerError('Hiba történt a vizsgálat eltávolítása közben!'));
    }
  },

};
