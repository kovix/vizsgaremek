const createError = require('http-errors');
const userService = require('./user.service');
const User = require('../../model/user.model');
const logger = require('../../../config/logger');
const baseController = require('../base/controller');

const allowedFields = ['userName', 'password', 'firstName', 'lastName', 'email', 'role'];

const userExports = baseController.generateCRUD(userService, User, allowedFields);

delete userExports.create;
delete userExports.delete;
delete userExports.update;

userExports.validateLogin = async (req, res, next) => {
  const { userName, password } = req.body;
  userService.validateLogin(userName, password)
    .then((result) => {
      if (!result) return next(new createError.Unauthorized('Érvénytelen felhasználónév vagy jelszó.'));
      return res.json(result);
    });
};

userExports.create = async (req, res, next) => {
  const {
    userName,
    password,
    confirmPassword,
    email,
    firstName,
    lastName,
  } = req.body;

  let errorMessage = '';

  if (!userName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('felhasználó'));
  if (!password) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('jelszó'));
  if (password !== confirmPassword) errorMessage = baseController.addToError(errorMessage, 'A megadott jelszavak eltérőek!');
  if (!email) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('email'));
  if (!firstName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('vezetéknév'));
  if (!lastName) errorMessage = baseController.addToError(errorMessage, baseController.buildReqError('keresztnév'));

  const usernameCount = await User.countDocuments({ userName: { $eq: userName } });
  const emailCount = await User.countDocuments({ email: { $eq: email } });

  if (usernameCount) errorMessage = baseController.addToError(errorMessage, 'Ez a felhasználónév már foglalt!');
  if (emailCount) errorMessage = baseController.addToError(errorMessage, 'Ez az e-mail cím már szerepel az adatbázisban!');

  if (errorMessage) return next(new createError.BadRequest(errorMessage));

  delete req.body.confirmPassword;

  return userService.registerUser(req.body)
    .then((newUser) => res.json(newUser))
    .catch((error) => {
      logger.error(error);
      next(new createError.InternalServerError('Unknown error occred'));
    });
};

module.exports = userExports;
