const service = require('./consultation.service');
const Consultation = require('../../model/consultation.model');
const baseController = require('../base/controller');

const allowedFields = ['name', 'startDate', 'doctor', 'groupId', 'examinations', 'consultationDetails', 'logEntries'];

module.exports = baseController.generateCRUD(service, Consultation, allowedFields);
