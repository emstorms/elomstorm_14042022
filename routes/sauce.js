//Routes pour les requêtes de sauces

const express = require('express');
const router = express.Router();
const sauceMiddleware = require('../controllers/sauce');

router.get('/api/sauces', sauceMiddleware.currentSauce);
router.get('/api/sauces/:id',sauceMiddleware.listSauce);
router.post('/api/sauces',sauceMiddleware.initializeSauce);
router.put('/api/sauces/:id',sauceMiddleware.updateSauce);
router.delete('/api/sauce/:id',sauceMiddleware.deleteSauce);

module.exports = router;