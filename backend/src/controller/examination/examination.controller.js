const createError = require('http-errors');
const baseService = require('../base/service');
const Examination = require('../../model/examination.model');

const service = baseService(Examination);

exports.findAll = (req, res) => service.findAll()
  .then((examinions) => res.json(examinions));

exports.findById = (req, res, next) => service.findById(req.param.id)
  .then((examination) => res.json(examination))
  .catch((error) => next(new createError.NotFound(`Nem található bejegyzés az alábbi azonosítóval: ${req.param.id}. (${error.message})`)));

module.exports = exports;
