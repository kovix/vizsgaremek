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

exports.findAll = (req, res) => service.findAll()
  .then((examinions) => res.json(examinions));

exports.findById = (req, res, next) => service.findById(req.params.id)
  .then((examination) => res.json(examination))
  .catch((error) => next(new createError.NotFound(`Nem található bejegyzés az alábbi azonosítóval: ${req.params.id}. (${error.message})`)));

exports.create = (req, res, next) => {
  const cleanedBody = baseController.clearBody(req.body);
  const bodyHasErros = isBodyHasErrors(cleanedBody);
  if (bodyHasErros) return next(bodyHasErros);

  return service.create(cleanedBody)
    .then((newExamination) => res.json(newExamination))
    .catch((error) => next(new createError.NotFound(`Nem sikerült menteni a vizsgálatot: ${req.body.name}. (${error.message})`)));
};

exports.update = (req, res, next) => {
  const cleanedBody = baseController.clearBody(req.body);
  const bodyHasErros = isBodyHasErrors(cleanedBody);
  if (bodyHasErros) return next(bodyHasErros);

  return service.update(req.params.id, cleanedBody)
    .then((updatedExamination) => {
      if (!updatedExamination) return next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id} A rekord nem található.`));
      return res.json(updatedExamination);
    })
    .catch((error) => next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id}. (${error.message})`)));
};

// eslint-disable-next-line no-underscore-dangle
exports.delete = (req, res, next) => service.remove(req.params.id, req.user._id)
  .then((response) => {
    if (!response) return next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id}. `));
    return res.json(response);
  })
  .catch((error) => next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id}. (${error.message})`)));

module.exports = exports;
