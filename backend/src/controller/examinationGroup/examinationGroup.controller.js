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

module.exports = baseController.generateCRUD(service, requiredFields, isBodyHasErrors);