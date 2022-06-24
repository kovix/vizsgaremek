const service = require('./consultation.service');
const Consultation = require('../../model/consultation.model');
const Log = require('../../model/log.model');
const baseController = require('../base/controller');

const allowedFields = ['name', 'startDate', 'doctor', 'groupId', 'examinations', 'consultationDetails', 'logEntries'];

const consultationExports = baseController.generateCRUD(service, Consultation, allowedFields);

module.exports = consultationExports;
