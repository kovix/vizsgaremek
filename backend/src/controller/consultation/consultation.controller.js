const createError = require('http-errors');
const service = require('./consultation.service');
const Consultation = require('../../model/consultation.model');
const Log = require('../../model/log.model');
const baseController = require('../base/controller');
const examinationGroupService = require('../examinationGroup/examinationGroup.service');

const allowedFields = ['name', 'startDate', 'doctor', 'groupId', 'examinations', 'consultationDetails', 'logEntries'];

const consultationExports = baseController.generateCRUD(service, Consultation, allowedFields);

delete consultationExports.create;

consultationExports.create = async (req, res, next) => {
  const cleanedBody = baseController.clearBody(req.body, allowedFields);
  const bodyHasErros = baseController.validateBody(Consultation, cleanedBody);
  if (bodyHasErros) return next(bodyHasErros);

  // feltöltjük a vizsgálatok tömbjét. Erre azért van szükség, mert
  // a vizsgálatok sorrendje a rendelésnaplóban akkor sem változhat meg, ha
  // a vizsgálat csoportot később módosítják.
  let examinationGroup;
  try {
    examinationGroup = await examinationGroupService.findById(req.body.groupId);
  } catch (error) {
    return next(new createError.InternalServerError('Nem lehet a vizsgálat adatait betölteni!'));
  }

  if (!examinationGroup || examinationGroup.examinations.length === 0) {
    return next(new createError.InternalServerError('Nem lehet a vizsgálat adatait betölteni, vagy üres a vizsgálat!'));
  }

  const examinations = examinationGroup.examinations.map((exam) => {
    // eslint-disable-next-line no-underscore-dangle
    const doc = exam._doc;
    const ret = {
      order: doc.order,
      // eslint-disable-next-line no-underscore-dangle
      examination: doc.examination._id,
    };
    return ret;
  });

  cleanedBody.examinations = examinations;

  return service.create(cleanedBody)
    .then((newRecord) => res.json(newRecord))
    .catch((error) => next(new createError.NotFound(`Nem sikerült menteni a bejegyzést. (${error.message})`)));
};

module.exports = consultationExports;
