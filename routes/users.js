const { login, register, current, removeUser, getUser, getUsers, editUser } = require('../controllers/users')

const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

/* /api/users/login */
router.post('/login', login);

/* /api/users/register */
router.post('/register', register);

/* /api/users/current */
router.get('/current', auth, current);

/* /api/users/current */
router.get('/', auth, getUsers);

/* /api/users/current */
router.get('/current/:id', auth, getUser);

/* /api/users/remove */
router.post('/remove/:id', auth, removeUser);

/* /api/users/remove */
router.put('/current/edit/:id', auth, editUser);

module.exports = router;
