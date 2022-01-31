const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserModelSchema = new Schema({
  email: {
    unique: true,
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

UserModelSchema.plugin(uniqueValidator);
const UserModel = mongoose.model('User', UserModelSchema);
module.exports = UserModel;
