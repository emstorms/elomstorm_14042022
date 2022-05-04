
const express = require('express');
const router = express.Router();
const userAccountLog = require('../controllers/authController');

router.post('/signup', userAccountLog.signup);
router.post('/login',userAccountLog.login);


module.exports = router;