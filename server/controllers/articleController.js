const ArticleModel = require('../models/articleModel');
const { isIDValid, isArticleFound } = require('../validators');
const { cloudinaryUploader } = require('../helpers/cloudinaryUploader');

module.exports.getArticles = async (req, res) => {
  try {
    const articlesFromDb = await ArticleModel.find({});
    res.status(200).json({ articlesFromDb });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};
module.exports.getTwoArticles = async (req, res) => {
  try {
    const articlesFromDb = await ArticleModel.find({}).limit(2);
    res.status(200).json({ articlesFromDb });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.getArticlesById = async (req, res) => {
  const { id } = req.params;
  try {
    isIDValid(id);
    const article = await ArticleModel.findById(id);
    res.status(200).json({ article });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};
module.exports.getArticleBySeoUrl = async (req, res) => {
  const { seoUrl } = req.params;
  try {
    const article = await ArticleModel.findOne({ seoUrl });
    res.status(200).json({ article });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.postArticle = async (req, res) => {
  try {
    const uploadedImage = req.files.image;
    const cloudinaryData = await cloudinaryUploader(uploadedImage, req);

    if (cloudinaryData) {
      req.body.imgMainPath = cloudinaryData.url;
    }
    if (req.body.images) {
      const stringSplit = req.body.images.split(',');
      req.body.images = stringSplit;
    } else { req.body.images = []; }

    const newArticle = await ArticleModel.create(req.body);
    res.status(200).json(newArticle);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports.updateArticle = async (req, res) => {
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
    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { seoUrl },
      req.body,
      { new: true }
    );
    isArticleFound(updatedArticle);
    res.status(200).json(updatedArticle);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};
module.exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await ArticleModel.findOneAndDelete({ _id: id });
    isArticleFound(deletedArticle);
    res.status(200).json(deletedArticle);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};
