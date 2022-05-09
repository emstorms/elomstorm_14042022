//Routes pour les requêtes de sauces

const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const verification = require("../middelware/verifications");

router.post('/',verification.checkToken,sauceController.initializeSauce);
// router.get('/api/sauces', sauceController.currentSauce);
// router.get('/api/sauces/:id',sauceController.listSauce);
// router.put('/api/sauces/:id',sauceController.updateSauce);
// router.delete('/api/sauce/:id',sauceController.deleteSauce);

module.exports = router;