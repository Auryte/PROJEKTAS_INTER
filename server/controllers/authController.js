const { compare, hashPassword } = require('../helpers/hash');
const { generateToken } = require('../middlewares/tokenAuth');
const { ERRORS } = require('../constants/errors');
const UserModel = require('../models/userModel');

module.exports.authenticate = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    token: generateToken(req.user.email)
  });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await UserModel.findOne({ email });
    // UserModel.create({ email, password: hashPassword(password) });
    if (!foundUser) {
      throw new Error(ERRORS.USER_NOT_FOUND);
    }

    const samePassword = compare(password, foundUser.password);
    if (!samePassword) {
      throw new Error(ERRORS.WRONG_PASSWORD);
    }
    const token = generateToken(email);
    res.status(200).json({ email, token });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const usersFromDb = await UserModel.find({});
    res.status(200).json({ usersFromDb });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        email: req.body.email,
        password: hashPassword(req.body.password)
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};
