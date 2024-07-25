const { login, register, current, removeUser, getUser, editUser } = require('../controllers/users')

const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', auth, current);

/* /api/user/current */
router.get('/current/:id', auth, getUser);

/* /api/user/remove */
router.post('/remove/:id', auth, removeUser);

/* /api/user/remove */
router.put('/current/edit/:id', auth, editUser);

module.exports = router;
