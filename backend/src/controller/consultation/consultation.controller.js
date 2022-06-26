const createError = require('http-errors');
const service = require('./consultation.service');
const Consultation = require('../../model/consultation.model');
const Log = require('../../model/log.model');
const baseController = require('../base/controller');
const examinationGroupService = require('../examinationGroup/examinationGroup.service');

const allowedFields = ['name', 'startDate', 'doctor', 'groupId', 'examinations', 'logEntries'];

const changeTimeInDate = (date, timestring) => {
  // console.log(timestring);
  const clonedDate = new Date(date.getTime());
  const parts = timestring.split(':');
  clonedDate.setHours(parts[0], parts[1]);
  return clonedDate;
};

const consultationExports = baseController.generateCRUD(service, Consultation, allowedFields);

delete consultationExports.create;

consultationExports.create = async (req, res, next) => {
  const cleanedBody = baseController.clearBody(req.body, allowedFields);
  const bodyHasErros = await baseController.validateBody(Consultation, cleanedBody);
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

consultationExports.addPatients = async (req, res, next) => {
  if (!Array.isArray(req.body)) {
    return next(new createError.BadRequest('Nincs hozzáadható páciens!'));
  }

  const details = await service.findById(req.params.id);
  const examinations = details.examinations.sort((a, b) => a.order - b.order);

  const newPatientsArr = req.body.map((patientId) => {
    const obj = {};
    obj.patient = patientId;
    obj.arrived = null;
    obj.leaved = null;
    obj.lastUpdated = null;
    obj.patientConsultations = examinations.map((exam) => {
      const examObj = {
        // eslint-disable-next-line no-underscore-dangle
        examinationID: exam.examination._id,
        required: true,
        startedAt: null,
        finishedAt: null,
        callRequired: false,
      };
      return examObj;
    });
    return obj;
  });

  const response = await service.addPatients(req.params.id, newPatientsArr);
  if (response?.error) return next(response.response);
  return res.json(response);
};

consultationExports.updatePatient = async (req, res, next) => {
  const timePattern = /^$|^\d{1,2}:\d{1,2}$/;
  let details;
  try {
    details = await service.findById(req.params.id);
  } catch (error) {
    return next(new createError.NotFound('A rekord nem található'));
  }
  if (!details) return next(new createError.NotFound('A rekord nem található'));

  const { body } = req;

  // validálás, átalakítás
  if (body.arrived) {
    if (!timePattern.test(body.arrived)) return next(new createError.BadRequest('Érvénytelen érkezés adat'));
    body.arrived = changeTimeInDate(details.startDate, body.arrived);
  }
  if (body.leaved) {
    if (!timePattern.test(body.leaved)) return next(new createError.BadRequest('Érvénytelen távozás adat'));
    body.leaved = changeTimeInDate(details.startDate, body.leaved);
  }

  if (Array.isArray(body.examinations)) {
    let hasInternalErrors = false;

    body.examinations = body.examinations.map((exam) => {
      if (exam.startedAt) {
        if (!timePattern.test(exam.startedAt)) {
          hasInternalErrors = true;
        } else {
          exam.startedAt = changeTimeInDate(details.startDate, exam.startedAt);
        }
      }
      if (exam.finishedAt) {
        if (!timePattern.test(exam.finishedAt)) {
          hasInternalErrors = true;
        } else {
          exam.finishedAt = changeTimeInDate(details.startDate, exam.finishedAt);
        }
      }
      return exam;
    });
    if (hasInternalErrors) return next(new createError.BadRequest('Érvénytelen időadat a vizsgálatok között'));
  }

  body.lastUpdated = new Date();

  const response = await service.updatePatient(req.params.id, req.params.patientid, body);
  if (response?.error) return next(response.response);
  return res.json(response);
};

module.exports = consultationExports;
