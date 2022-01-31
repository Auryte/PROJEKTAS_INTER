const bcrypt = require('bcrypt');

const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password) => bcrypt.hashSync(password, salt);

const compare = (plainPassword, hashedPassword) =>
  bcrypt.compareSync(plainPassword, hashedPassword);

module.exports = {
  hashPassword,
  compare
};
