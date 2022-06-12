const mongoose = require('mongoose');
const Examination = require('../../model/examination.model');

exports = {};

exports.findAll = () => Examination.find({}).populate('createdBy');
exports.findById = (id) => Examination.findById(id).populate('createdBy');

exports.create = (properties) => {
  const newExamination = new Examination(properties);
  return newExamination.save();
};

exports.update = (id, properties) => {
  const filter = { _id: id };
  return Examination.findOneAndUpdate(filter, properties, { new: true });
};

exports.remove = async (id, userId) => {
  const record = await Examination.findById(id);
  if (!record) return false;

  return record.delete(userId);
};

module.exports = exports;
