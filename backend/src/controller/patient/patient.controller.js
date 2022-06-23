const createError = require('http-errors');
const service = require('./patient.service');
const baseController = require('../base/controller');

const requiredFields = ['firstName', 'lastName', 'createdBy'];

const isBodyHasErrors = (body) => {
  const {
    firstName,
    lastName,
  } = body;

  let errorMessage = '';
  if (!firstName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('Vezetéknév'));
  if (!lastName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('Keresztnév'));
  if (errorMessage) return new createError.BadRequest(errorMessage);

  return false;
};

module.exports = baseController.generateCRUD(service, requiredFields, isBodyHasErrors, true);
