const { login, register, current, getUser, getUsers, editUser, deleteUser } = require('../controllers/users')

const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

/* /api/users/login */
router.post('/login', login);

/* /api/users/register */
router.post('/register', register);

/* /api/users/current */
router.get('/current', auth, current);

/* /api/users */
router.get('/', auth, getUsers);

/* /api/users/current/:id */
router.get('/current/:id', auth, getUser);

/* /api/users/remove */
router.put('/current/edit/:id', auth, editUser);

/* /api/users/:id */
router.delete('/:id', auth, deleteUser);

module.exports = router;
