const express = require('express');
const { registerAdmin, loginAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authAdmin');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/me', protect, getMe);

module.exports = router;
