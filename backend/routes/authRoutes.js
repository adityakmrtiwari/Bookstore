const express = require('express');
const { signup, login, verifyToken, refreshToken } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', protect, verifyToken);
router.post('/refresh', refreshToken);

module.exports = router;