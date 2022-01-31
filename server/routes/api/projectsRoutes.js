const { Router } = require('express');
const router = Router();
const {
  getProjects,
  getTwoProjects,
  getProjectBySeoUrl,
  getProjectById,
  postProject,
  updateProject,
  deleteProject
} = require('../../controllers/projectController');

router.get('/', getProjects);

router.get('/2', getTwoProjects);

router.get('/:seoUrl', getProjectBySeoUrl);

router.get('/:id', getProjectById);

router.post('/', postProject);

router.patch('/:seoUrl', updateProject);

router.delete('/:id', deleteProject);

module.exports = router;
