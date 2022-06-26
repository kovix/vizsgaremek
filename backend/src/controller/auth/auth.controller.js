const createError = require('http-errors');
const authService = require('./auth.service');
const logger = require('../../../config/logger');

const authcontrollerExports = {};
const validTokens = [];

authcontrollerExports.validateLogin = async (req, res, next) => {
  const { userName, password } = req.body;
  authService.validateLogin(userName, password)
    .then((result) => {
      if (!result) return next(new createError.Unauthorized('Érvénytelen felhasználónév vagy jelszó.'));
      logger.info(`User ${result.user.userName} logged in.`);
      validTokens.push(result.refreshToken);
      return res.json(result);
    });
};

authcontrollerExports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    logger.info('Dropping refresh request with empty refreshToken');
    return next(new createError[401]('A művelet nem teljeíthető'));
  }

  if (!validTokens.includes(refreshToken)) {
    logger.info('Dropping refresh request with fraud or expired refreshToken');
    // return next(new createError[403]('A művelet nem teljeíthető'));
  }
  const response = await authService.getNewToken(refreshToken);
  if (response?.error) return next(response.response);
  return res.json({ response });
};

authcontrollerExports.logout = (req, res) => {
  const { refreshToken } = req.body;
  const index = validTokens.indexOf(refreshToken);
  validTokens.splice(index, 1);
  return res.json({ success: true });
};

module.exports = authcontrollerExports;
