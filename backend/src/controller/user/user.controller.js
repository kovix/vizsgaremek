/* eslint no-param-reassign: ["error", { "props": false }] */
const createError = require('http-errors');
const userService = require('./user.service');
const User = require('../../model/user.model');
const logger = require('../../../config/logger');
const baseController = require('../base/controller');

const validateUserInput = async (body, inUpdate = true) => {
  const {
    userName,
    password,
    confirmPassword,
    email,
    firstName,
    lastName,
  } = body;

  let errorMessage = '';

  if (!userName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('felhasználó'));
  if (!email) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('email'));
  if (!firstName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('vezetéknév'));
  if (!lastName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('keresztnév'));

  if (!inUpdate) {
    if (!password) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('jelszó'));
    if (password !== '' && password !== confirmPassword) errorMessage = baseController.addToError(errorMessage, 'A megadott jelszavak eltérőek!');
    const usernameCount = await User.countDocuments({ userName: { $eq: userName } });
    const emailCount = await User.countDocuments({ email: { $eq: email } });
    if (usernameCount) errorMessage = baseController.addToError(errorMessage, 'Ez a felhasználónév már foglalt!');
    if (emailCount) errorMessage = baseController.addToError(errorMessage, 'Ez az e-mail cím már szerepel az adatbázisban!');
  }

  return errorMessage;
};

const userExports = {};

userExports.validateLogin = async (req, res, next) => {
  const { userName, password } = req.body;
  userService.validateLogin(userName, password)
    .then((result) => {
      if (!result) return next(new createError.Unauthorized('Érvénytelen felhasználónév vagy jelszó.'));
      return res.json(result);
    });
};

userExports.findAll = (req, res) => userService.findAll()
  .then((records) => {
    records.map(({ password, ...otherFields }) => otherFields);
    return res.json(records);
  });

userExports.findById = (req, res, next) => userService.findById(req.params.id)
  .then((record) => {
    // eslint-disable-next-line no-underscore-dangle
    delete record._doc.password;
    return res.json(record);
  })
  .catch((error) => next(new createError.NotFound(`Nem található bejegyzés az alábbi azonosítóval: ${req.params.id}. (${error.message})`)));

userExports.create = async (req, res, next) => {
  const errorMessage = await validateUserInput(req.body, false);
  if (errorMessage) return next(new createError.BadRequest(errorMessage));

  delete req.body.confirmPassword;

  return userService.registerUser(req.body)
    .then((newUser) => res.json(newUser))
    .catch((error) => {
      logger.error(error);
      next(new createError.InternalServerError('Unknown error occred'));
    });
};

userExports.update = async (req, res, next) => {
  const errorMessage = await validateUserInput(req.body, true);
  if (errorMessage) return next(new createError.BadRequest(errorMessage));

  return userService.update(req.params.id, req.body)
    .then((updatedRecord) => {
      if (!updatedRecord) return next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id} A rekord nem található.`));
      return res.json(updatedRecord);
    })
    .catch((error) => next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id}. (${error.message})`)));
};

module.exports = userExports;
