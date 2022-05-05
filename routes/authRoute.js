
const express = require('express');
const router = express.Router();
const userAccount = require('../controllers/authController');
const verifications = require("../middelware/verifications");


router.post('/signup', userAccount.signup);
router.post('/login',verifications.checkToken,userAccount.login);


module.exports = router;