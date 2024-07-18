const { login, register, current, remove } = require('../controllers/users')

const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', auth, current);

/* /api/user/remove/:id */
router.get('/remove/:id', auth, remove);

module.exports = router;
