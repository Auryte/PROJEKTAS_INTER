const ProjectModel = require('../models/projectModel');
const { isProjectIDValid, isFoundProject } = require('../validators');
const { cloudinaryUploader } = require('../helpers/cloudinaryUploader');

module.exports.getProjects = async (req, res) => {
  try {
    const projectsFromDb = await ProjectModel.find({});
    res.status(200).json({ projectsFromDb });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.getTwoProjects = async (req, res) => {
  try {
    const twoProjectsFromDb = await ProjectModel.find({}).limit(2);
    res.status(200).json({ twoProjectsFromDb });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.getProjectBySeoUrl = async (req, res) => {
  const { seoUrl } = req.params;
  try {
    const project = await ProjectModel.findOne({ seoUrl });
    res.status(200).json({ project });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    isProjectIDValid(id);
    const projects = await ProjectModel.findById(id);
    res.status(200).json({ projects });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.postProject = async (req, res) => {
  try {
    const uploadedImage = req?.files?.image;
    let cloudinaryData;
    if (uploadedImage) {
      cloudinaryData = await cloudinaryUploader(uploadedImage, req);
    }
    if (cloudinaryData) {
      req.body.imgMainPath = cloudinaryData.url;
    }
    if (req.body.images) {
      const stringSplit = req.body.images.split(',');
      req.body.images = stringSplit;
    } else {
      req.body.images = [];
    }

    const newProject = await ProjectModel.create(req.body);
    res.status(200).json(newProject);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.updateProject = async (req, res) => {
  const { seoUrl } = req.params;
  const uploadedImage = req?.files?.image;
  let cloudinaryData;
  if (uploadedImage) {
    cloudinaryData = await cloudinaryUploader(uploadedImage, req);
  }
  if (cloudinaryData) {
    req.body.imgMainPath = cloudinaryData.url;
  }
  if (req.body.images) {
    const stringSplit = req.body.images.split(',');
    req.body.images = stringSplit;
  } else { req.body.images = []; }
  try {
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { seoUrl: seoUrl },
      req.body,
      { new: true });
    isFoundProject(updatedProject);
    res.status(200).json(updatedProject);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    isProjectIDValid(id);
    const deletedProject = await ProjectModel.findOneAndDelete({ _id: id });
    isFoundProject(deletedProject);
    res.status(200).json(deletedProject);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};
