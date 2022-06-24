const jwt = require('jsonwebtoken');
const User = require('../../model/user.model');

const userExports = {};

userExports.findAll = () => User.find({});

userExports.findById = (id) => User.findById(id);

userExports.validateLogin = async (userName, password) => {
  const user = await User.findOne({ userName: { $eq: userName } });
  if (!user) return false;

  if (user.deleted) return false;

  const validationResult = await user.comparePassword(password);

  if (!validationResult) return false;

  const accessToken = jwt.sign({
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id,
    email: user.email,
    role: 1, // TODO!
  }, process.env.JWT_SIGN_KEY, {
    expiresIn: '1h',
  });

  return {
    accessToken,
    // eslint-disable-next-line no-underscore-dangle
    user: { ...user._doc, password: '' },
  };
};

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
