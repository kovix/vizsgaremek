exports = {}

exports.buildReqError = (fieldTitle) => `Kötelező mező ${fieldTitle} nincs kitöltve!`;

exports.addToError = (origError, newError) => `${origError}${origError ? '<br /> ' : ''}${newError}`;

exports.clearBody = (body, requiredFields) => {
  const processedBody = body;
  Object.keys(processedBody).forEach((key) => {
    if (!requiredFields.includes(key)) delete processedBody[key];
  });
  return processedBody;
};

module.exports = exports;
