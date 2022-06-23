const service = require('./examination.service');
const Examination = require('../../model/examination.model');
const baseController = require('../base/controller');

const allowedFields = ['name', 'defaultTime', 'createdBy'];

module.exports = baseController.generateCRUD(service, Examination, allowedFields);
