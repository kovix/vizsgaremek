const jwt = require('jsonwebtoken');
const logger = require('../../config/logger');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SIGN_KEY, (err, user) => {
    if (err) {
      logger.error(`Error parsing jwt token: ${err}`);
      return res.sendStatus(401);
    }
    req.user = user;
    return next();
  });
};
