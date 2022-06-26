const createError = require('http-errors');
const logger = require('../../../config/logger');

const baseExports = {};

baseExports.buildReqError = (fieldTitle) => `Kötelező mező ${fieldTitle} nincs kitöltve!`;

baseExports.addToError = (origError, newError) => `${origError}${origError ? '<br /> ' : ''}${newError}`;

baseExports.clearBody = (body, allowedFields) => {
  const processedBody = body;
  Object.keys(processedBody).forEach((key) => {
    if (!allowedFields.includes(key)) delete processedBody[key];
  });
  return processedBody;
};

baseExports.validateBody = async (Model, body) => {
  const newModel = new Model(body);
  let validationErrors;
  try {
    validationErrors = await newModel.validate();
  } catch(error) {
    console.log(error);
    return new createError.BadRequest(error.message);
  }
  if (validationErrors) {
    return new createError.BadRequest(validationErrors.message);
  }
  return false;
};

baseExports.generateCRUD = (service, model, allowedFields) => {
  const crud = {};
  crud.findAll = (req, res) => service.findAll()
    .then((records) => res.json(records));

  crud.findById = (req, res, next) => service.findById(req.params.id)
    .then((record) => res.json(record))
    .catch((error) => next(new createError.NotFound(`Nem található bejegyzés az alábbi azonosítóval: ${req.params.id}. (${error.message})`)));

  crud.create = async (req, res, next, addCreatedBy = false) => {
    const cleanedBody = baseExports.clearBody(req.body, allowedFields);
    if (addCreatedBy) {
      // eslint-disable-next-line no-underscore-dangle
      cleanedBody.createdBy = req.user._id;
    }
    const bodyHasErros = await baseExports.validateBody(model, cleanedBody);
    if (bodyHasErros) return Promise.resolve(next(bodyHasErros));

    return service.create(cleanedBody)
      .then((newRecord) => res.json(newRecord))
      .catch((error) => next(new createError.NotFound(`Nem sikerült menteni a bejegyzést. (${error.message})`)));
  };

  crud.update = async (req, res, next) => {
    const cleanedBody = baseExports.clearBody(req.body, allowedFields);
    const bodyHasErros = await baseExports.validateBody(model, cleanedBody);
    if (bodyHasErros) return next(bodyHasErros);

    return service.update(req.params.id, cleanedBody)
      .then((updatedRecord) => {
        if (!updatedRecord) return next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id} A rekord nem található.`));
        return res.json(updatedRecord);
      })
      .catch((error) => next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id}. (${error.message})`)));
  };

  // eslint-disable-next-line no-underscore-dangle
  crud.delete = (req, res, next) => service.remove(req.params.id, req.user._id)
    .then((response) => {
      if (!response) return next(new createError.NotFound(`Hiba történt a rekord törlése közben: ${req.params.id}. `));
      return res.json(response);
    })
    .catch((error) => {
      logger.error(`Hiba történt egy vizsgálat törlése közben: ${error.message}`);
      return next(new createError.NotFound(`Hiba történt a rekord törlése közben: ${req.params.id}.`));
    });

  return crud;
};

module.exports = baseExports;
