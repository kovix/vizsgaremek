const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../../model/user.model');
const { createErrorObj } = require('../base/service');

const authExports = {};

authExports.validateLogin = async (userName, password) => {
  const user = await User.findOne({ userName: { $eq: userName } });
  if (!user) return false;

  if (user.deleted) return false;

  const validationResult = await user.comparePassword(password);

  conseol.log(validationResult);

  if (!validationResult) return false;

  const accessToken = jwt.sign({
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id,
    email: user.email,
    role: user.role,
  }, process.env.JWT_SIGN_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  const refreshToken = jwt.sign({
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id,
    email: user.email,
    role: user.role,
  }, process.env.REFRESH_SIGN_KEY, {
    expiresIn: process.env.REFRESH_EXPIRES,
  });

  return {
    accessToken,
    refreshToken,
    // eslint-disable-next-line no-underscore-dangle
    user: { ...user._doc, password: '' },
  };
};

authExports.getNewToken = async (refreshToken) => {
  let user;
  try {
    user = await jwt.verify(refreshToken, process.env.REFRESH_SIGN_KEY);
  } catch (err) {
    return Promise.resolve(createErrorObj(new createError[403]('A művelet nem hajtható végre.')));
  }

  if (!user) return createErrorObj(new createError[403]('A művelet nem hajtható végre 2.'));

  const { _id, email, role } = user;

  const newToken = await jwt.sign(
    {
      _id,
      email,
      role,
    },
    process.env.JWT_SIGN_KEY,
    { expiresIn: process.env.REFRESH_EXPIRES },
  );

  return newToken;
};

module.exports = authExports;
