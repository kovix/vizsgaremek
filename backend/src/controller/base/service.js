const baseServiceClass = {
  createErrorObj: (error) => ({ error: true, response: error }),
};

module.exports = baseServiceClass;
