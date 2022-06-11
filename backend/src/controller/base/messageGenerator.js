module.exports = {
  buildReqError: (fieldTitle) => `Kötelező mező ${fieldTitle} nincs kitöltve!`,
  addToError: (origError, newError) => `${origError}${origError ? '<br /> ' : ''}${newError}`,
};
