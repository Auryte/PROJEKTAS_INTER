const { ERRORS } = require('../constants/errors');
const mongoose = require('mongoose');

const isValid = (id, error) => {
  if (!mongoose.Types.ObjectId.isValid(id)) { throw new Error(error); }
};
module.exports.isIDValid = (id) => {
  isValid(id, ERRORS.ARTICLE_ID_NOT_VALID);
};
module.exports.isProjectIDValid = (id) => {
  isValid(id, ERRORS.PROJECT_ID_NOT_VALID);
};

const isFound = (item, error) => {
  if (item === null) { throw new Error(error); }
};
module.exports.isFoundProject = (project) => {
  isFound(project, ERRORS.PROJECT_NOT_FOUND);
};
module.exports.isArticleFound = (article) => {
  isFound(article, ERRORS.ARTICLE_NOT_FOUND);
};
