const service = require('./patient.service');
const Patient = require('../../model/patient.model');
const baseController = require('../base/controller');

const allowedFields = ['firstName', 'lastName', 'email', 'patientID', 'comment', 'createdBy'];

module.exports = baseController.generateCRUD(service, Patient, allowedFields);
