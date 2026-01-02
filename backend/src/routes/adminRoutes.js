const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middlewares/authAdmin');

const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);

module.exports = router;
