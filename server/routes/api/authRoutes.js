const { Router } = require('express');
const { authenticate, login, getUsers, updateUser } = require('../../controllers/authController');
const { authenticateByToken } = require('../../middlewares/tokenAuth');
const router = Router();

router.get('/', authenticateByToken, authenticate);

router.get('/users', getUsers);

router.post('/login', login);

router.patch('/:id', updateUser);

module.exports = router;
