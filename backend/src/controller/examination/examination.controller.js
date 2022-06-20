const createError = require('http-errors');
const service = require('./examination.service');
const baseController = require('../base/controller');

const requiredFields = ['name', 'defaultTime'];

const isBodyHasErrors = (body) => {
  const {
    name,
    defaultTime,
  } = body;

  let errorMessage = '';
  if (!name) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('vizsgálat neve'));
  if (!Number.isInteger(defaultTime)) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('vizsgálat átlagos időtartama'));
  if (errorMessage) return new createError.BadRequest(errorMessage);

  return false;
};

module.exports = baseController.generateCRUD(service, requiredFields, isBodyHasErrors);
