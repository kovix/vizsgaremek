const service = require('./log.service');
const LogModel = require('../../model/log.model');
const baseController = require('../base/controller');

const allowedFields = ['user', 'eventText'];
const logExports = baseController.generateCRUD(service, LogModel, allowedFields);

delete logExports.findAll;
delete logExports.findById;
delete logExports.update;
delete logExports.delete;

module.exports = logExports;
