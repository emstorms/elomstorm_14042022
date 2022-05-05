
const express = require('express');
const router = express.Router();
const userAccount = require('../controllers/authController');

router.post('/signup', userAccount.signup);
// router.post('/login',userAccount.login);


module.exports = router;