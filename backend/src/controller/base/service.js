module.exports = (model) => ({
  findAll: () => model.find({}),
  findById: (id) => model.findById(id),
});
