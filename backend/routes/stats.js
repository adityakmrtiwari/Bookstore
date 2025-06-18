const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Public stats endpoint
router.get('/public', statsController.getPublicStats);

module.exports = router; 