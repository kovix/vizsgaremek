const createError = require('http-errors');

const baseExports = {};

baseExports.buildReqError = (fieldTitle) => `Kötelező mező ${fieldTitle} nincs kitöltve!`;

baseExports.addToError = (origError, newError) => `${origError}${origError ? '<br /> ' : ''}${newError}`;

baseExports.clearBody = (body, requiredFields) => {
  const processedBody = body;
  Object.keys(processedBody).forEach((key) => {
    if (!requiredFields.includes(key)) delete processedBody[key];
  });
  return processedBody;
};

baseExports.generateCRUD = (service, requiredFields, isBodyHasErrors) => {
  const crud = {};
  crud.findAll = (req, res) => service.findAll()
    .then((records) => res.json(records));

  crud.findById = (req, res, next) => service.findById(req.params.id)
    .then((record) => res.json(record))
    .catch((error) => next(new createError.NotFound(`Nem található bejegyzés az alábbi azonosítóval: ${req.params.id}. (${error.message})`)));

  crud.create = (req, res, next) => {
    const cleanedBody = baseExports.clearBody(req.body, requiredFields);
    const bodyHasErros = isBodyHasErrors(cleanedBody);
    if (bodyHasErros) return next(bodyHasErros);

    return service.create(cleanedBody)
      .then((newRecord) => res.json(newRecord))
      .catch((error) => next(new createError.NotFound(`Nem sikerült menteni a bejegyzést: ${req.body.name}. (${error.message})`)));
  };

  crud.update = (req, res, next) => {
    const cleanedBody = baseExports.clearBody(req.body, requiredFields);
    const bodyHasErros = isBodyHasErrors(cleanedBody);
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
    .catch((error) => next(new createError.NotFound(`Hiba történt a rekord törlése közben: ${req.params.id}. (${error.message})`)));

  return crud;
};

module.exports = baseExports;
