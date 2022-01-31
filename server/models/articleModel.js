const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ArticleModelSchema = new Schema({
  title: {
    unique: true,
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgMainPath: String,
  images: [String],
  seoUrl: {
    unique: true,
    type: String,
    required: true
  },
  metaTitleTag: {
    unique: true,
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  }
}, { timestamps: true });

ArticleModelSchema.plugin(uniqueValidator);
const ArticleModel = mongoose.model('Articles', ArticleModelSchema);
module.exports = ArticleModel;
