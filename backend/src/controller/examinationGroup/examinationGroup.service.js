const ExaminationGroup = require('../../model/examinationGroup.model');

exports = {};

exports.findAll = () => ExaminationGroup.find({}).populate('examinations.examination');
exports.findById = (id) => ExaminationGroup.findById(id).populate('examinations.examination');

exports.create = (properties) => {
  const newExamination = new ExaminationGroup(properties);
  newExamination.examinations = [];
  return newExamination.save();
};
