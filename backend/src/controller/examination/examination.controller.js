const createError = require('http-errors');
const service = require('./examination.service');
const msg = require('../base/messageGenerator');

const isBodyHasErrors = (body) => {
  const {
    name,
    defaultTime,
  } = body;

  let errorMessage = '';
  if (!name) errorMessage = msg.addToError(errorMessage, msg.buildReqError('vizsgálat neve'));
  if (!Number.isInteger(defaultTime)) errorMessage = msg.addToError(errorMessage, msg.buildReqError('vizsgálat átlagos időtartama'));
  if (errorMessage) return new createError.BadRequest(errorMessage);

  return false;
};

exports.findAll = (req, res) => service.findAll()
  .then((examinions) => res.json(examinions));

exports.findById = (req, res, next) => service.findById(req.params.id)
  .then((examination) => res.json(examination))
  .catch((error) => next(new createError.NotFound(`Nem található bejegyzés az alábbi azonosítóval: ${req.params.id}. (${error.message})`)));

exports.create = (req, res, next) => {
  const bodyHasErros = isBodyHasErrors(req.body);
  if (bodyHasErros) return next(bodyHasErros);

  return service.create(req.body)
    .then((newExamination) => res.json(newExamination))
    .catch((error) => next(new createError.NotFound(`Nem sikerült menteni a vizsgálatot: ${req.body.name}. (${error.message})`)));
};

exports.update = (req, res, next) => {
  const bodyHasErros = isBodyHasErrors(req.body);
  if (bodyHasErros) return next(bodyHasErros);

  return service.update(req.params.id, req.body)
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
