const { Router } = require('express');
const router = Router();
const {
  getArticles,
  getTwoArticles,
  getArticlesById,
  getArticleBySeoUrl,
  postArticle,
  updateArticle,
  deleteArticle
} = require('../../controllers/articleController');

router.get('/', getArticles);

router.get('/2', getTwoArticles);

router.get('/:seoUrl', getArticleBySeoUrl);

router.get('/:id', getArticlesById);

router.post('/', postArticle);

router.patch('/:seoUrl', updateArticle);

router.delete('/:id', deleteArticle);

module.exports = router;
