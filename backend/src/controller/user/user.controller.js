const express = require('express');
const createError = require('http-errors');
const userService = require('./user.service');
const User = require('../../model/user.model');
const logger = require('../../../config/logger');

const buildReqError = (fieldTitle) => `Kötelező mező ${fieldTitle} nincs kitöltve!`;
const addToError = (origError, newError) => `${origError}${origError ? '<br /> ' : ''}${newError}`;

exports.validateLogin = async (req, res, next) => {
  const { userName, password } = req.body;
  userService.validateLogin(userName, password)
    .then((result) => {
      if (!result) return next(new createError.Unauthorized('error occred'));
      return res.json(result);
    });
};

exports.registerUser = async (req, res, next) => {
  const {
    userName,
    password,
    confirmPassword,
    email,
    firstName,
    lastName,
  } = req.body;

  let errorMessage = '';

  if (!userName) errorMessage = addToError(errorMessage, buildReqError('felhasználó'));

  if (!password) errorMessage = addToError(errorMessage, buildReqError('jelszó'));

  if (password !== confirmPassword) errorMessage = addToError(errorMessage, 'A megadott jelszavak eltérőek!');

  if (!email) errorMessage = addToError(errorMessage, buildReqError('email'));

  if (!firstName) errorMessage = addToError(errorMessage, buildReqError('vezetéknév'));

  if (!lastName) errorMessage = addToError(errorMessage, buildReqError('keresztnév'));

  const usernameCount = await User.countDocuments({ userName: { $eq: userName } });
  const emailCount = await User.countDocuments({ email: { $eq: email } });

  if (usernameCount) {
    errorMessage = addToError(errorMessage, 'Ez a felhasználónév már foglalt!');
  }
  if (emailCount) {
    errorMessage = addToError(errorMessage, 'Ez az e-mail cím már szerepel az adatbázisban!');
  }

  if (errorMessage) {
    return next(new createError.BadRequest(errorMessage));
  }

  delete req.body.confirmPassword;

  return userService.registerUser(req.body)
    .then((newUser) => res.json(newUser))
    .catch((error) => {
      logger.error(error);
      next(new createError.InternalServerError('Unknown error occred'));
    });
};

module.exports = exports;
