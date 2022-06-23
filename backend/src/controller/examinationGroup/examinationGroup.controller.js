const createError = require('http-errors');
const service = require('./examinationGroup.service');
const ExaminationGroup = require('../../model/examinationGroup.model');
const baseController = require('../base/controller');

const requiredFields = ['name'];

const exGroupExports = baseController.generateCRUD(service, ExaminationGroup, requiredFields);

exGroupExports.addExaminations = async (req, res, next) => {
  const examinations = req.body;
  if (!Array.isArray(examinations)) return next(new createError.BadRequest('Érvénytelen hívás!'));
  const response = await service.addExaminations(req.params.id, examinations);
  if (response?.error) return next(response.response);
  return res.json(response);
};

exGroupExports.saveReorder = async (req, res, next) => {
  const examinations = req.body;
  if (!Array.isArray(examinations)) return next(new createError.BadRequest('Érvénytelen hívás!'));
  const response = await service.reorderExaminations(req.params.id, examinations);
  if (response?.error) return next(response.response);
  return res.json(response);
};

exGroupExports.removeExamination = async (req, res, next) => {
  const response = await service.removeExamination(req.params.id, req.params.examid);
  if (response?.error) return next(response.response);
  return res.json(response);
};

module.exports = exGroupExports;
