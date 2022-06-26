const User = require('../../model/user.model');

const userExports = {};

userExports.findAll = () => User.find({});
userExports.findById = (id) => User.findById(id);

userExports.registerUser = async (userObj) => {
  const newUser = new User(userObj);
  const savedUser = await newUser.save();
  // eslint-disable-next-line no-underscore-dangle
  return Promise.resolve({ ...savedUser._doc, password: '' });
};

userExports.update = (id, properties) => {
  const filter = { _id: id };
  return User.findOneAndUpdate(filter, properties, { new: true });
};

module.exports = userExports;
