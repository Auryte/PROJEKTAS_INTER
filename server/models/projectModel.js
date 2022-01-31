const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ProjectModelSchema = new Schema({
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

ProjectModelSchema.plugin(uniqueValidator);

const ProjectModel = mongoose.model('Projects', ProjectModelSchema);
module.exports = ProjectModel;
