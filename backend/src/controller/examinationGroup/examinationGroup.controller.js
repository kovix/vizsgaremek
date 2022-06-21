const createError = require('http-errors');
const service = require('./examinationGroup.service');
const baseController = require('../base/controller');

const requiredFields = ['name'];

const isBodyHasErrors = (body) => {
  const { name } = body;

  let errorMessage = '';
  if (!name) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('vizsgálat csoport neve'));
  if (errorMessage) return new createError.BadRequest(errorMessage);

  return false;
};

const exGroupExports = baseController.generateCRUD(service, requiredFields, isBodyHasErrors);

exGroupExports.addExaminations = async (req, res, next) => {
  const examinations = req.body;
  if (!Array.isArray(examinations)) return next(new createError.BadRequest('Érvénytelen hívás!'));
  const response = await service.addExaminations(req.params.id, examinations);
  if (response?.error) {
    return next(new createError.InternalServerError(response?.message));
  }
  return res.json(response);
};

module.exports = exGroupExports;
