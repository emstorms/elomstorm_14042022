//Routes pour les requêtes de sauces

const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const verification = require("../middelware/verifications");
const multer_1_img = require('../controllers/loading_image');

router.post('/',verification.checkTokenIsMember,multer_1_img,sauceController.initializeSauce);
// router.get('/',verification.checkToken, sauceController.currentSauce);
// router.put('/:id',verification.checkToken,sauceController.updateSauce);
// router.delete('/:id',verification.checkToken,sauceController.deleteSauce);

// router.get('/',verification.checkTokenIsMember);
// router.get('/',sauceController.listSauce);
router.get('/',verification.checkTokenIsMember,sauceController.listSauce);
router.get('/:id',verification.checkTokenIsMember,sauceController.currentSauce);

// router.get('/',verification.checkToken,sauceController.listSauce);


module.exports = router;