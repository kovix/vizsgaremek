/* eslint no-param-reassign: ["error", { "props": false }] */
const createError = require('http-errors');
const userService = require('./user.service');
const User = require('../../model/user.model');
const logger = require('../../../config/logger');
const baseController = require('../base/controller');

const genAnonymPass = (len) => Math.random().toString(36).substring(2,len+2);

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

userExports.findAll = (req, res) => userService.findAll()
  .then((records) => {
    records.map((record) => {
      if (record?._doc) {
        delete record._doc.password;
      } else {
        delete record.password;
      }
      return record;
    });
    return res.json(records);
  });

// eslint-disable-next-line no-underscore-dangle
userExports.findById = (req, res, next) => userService.findById(req.params.id !== '0' ? req.params.id : req.user._id)
  .then((record) => {
    // eslint-disable-next-line no-underscore-dangle
    if (record?._doc) {
      delete record._doc.password;
    } else {
      delete record.password;
    }
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
      if (updatedRecord?.doc) {
        delete updatedRecord._doc.password;
      } else {
        delete updatedRecord.password;
      }
      return res.json(updatedRecord);
    })
    .catch((error) => next(new createError.NotFound(`Hiba történt a rekord frissítése közben: ${req.params.id}. (${error.message})`)));
};

userExports.remove = async (req, res, next) => {
  let user;
  try {
    user = await userService.findById(req.params.id);
  } catch(error) {
    return next(new createError.BadRequest(error.message));
  }
  if (!user) {
    return next(new createError.NotFound('A felhasználó nem található!'));
  }

  const newPass = genAnonymPass(32);

  user.userName = `törölt_${new Date().getTime()}`;
  user.firstName = 'Törölt';
  user.lastName = 'Törölt';
  user.email = `do_not_send_${new Date().getTime()}@setalo.lap`;
  user.role = 0;
  user.password = newPass;
  user.confirmPassword = newPass;

  //anonimizáljuk
  let newRecord
  try {
    newRecord = await userService.update(req.params.id, user);
    console.log(newRecord);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  //töröljük
  const result = await userService.remove(req.params.id, req.user._id);
  //itt biztosan van értéke.
  return res.json(result);

}

module.exports = userExports;
