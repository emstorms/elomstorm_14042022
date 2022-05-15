//Routes pour les requêtes de sauces

const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const verification = require("../middelware/verifications");
const multer_1_img = require('../controllers/loading_image');

router.post('/',verification.checkTokenIsMember,multer_1_img,sauceController.initializeSauce);
// router.get('/',verification.checkToken, sauceController.currentSauce);
// router.put('/:id',verification.checkTokenIsMember,verification.checkIsSauceOwner,multer_1_img,sauceController.updateSauce);
// router.delete('/:id',verification.checkTokenIsMember,verification.checkIsSauceOwner,sauceController.deleteSauce);
router.put('/:id',verification.authorize,verification.checkIsSauceOwner,multer_1_img,sauceController.updateSauce);
router.delete('/:id',verification.authorize,verification.checkIsSauceOwner,sauceController.deleteSauce);

// router.get('/',verification.checkTokenIsMember);
// router.get('/',sauceController.listSauce);
// router.get('/',verification.checkTokenIsMember,sauceController.listSauce);
// router.get('/:id',verification.checkTokenIsMember,sauceController.currentSauce);


router.get('/',verification.authorize,sauceController.listSauce);
// 
router.get('/:id',verification.authorize,sauceController.currentSauce);
router.post('/:id/like',verification.authorize,sauceController.polling2);
// router.get('/',verification.checkToken,sauceController.listSauce);


module.exports = router;
 //Update Sauce id database
            // SauceModel.updateOne({_id : laSauce._id} , {...copySauce})
            // .then(res.status(200).json({message :"Sauce polling correctly updated"}))
            // .catch(res.status(400).json({message : "can't update Sauce"}));
   

            /*            
            laSauce.dislikes = laSauce.usersDisliked.length;
            laSauce.likes = laSauce.usersLiked.length;
            console.log("Sauce Parès like ou dislike");
            console.log(laSauce);
            console.log("COPY Sauce");
               for (let i = 0; i < copySauce.usersDisliked.length; ++i) {
                console.log("<<<<<<<<CONTENU DE FindUserInPOll>>>");
                if (copySauce.usersDisliked[i] == req.userId) {
                    console.log(`UserId  found in like array`);
                    //delete in the array
                    copySauce.usersDisliked.splice(i, 1);
                    //update likes

                }
            }
            console.log("cleaned DISLIKED ");         
            //deleteing in dislikeArray
            for (let i = 0; i < copySauce.usersLiked.length; ++i) {

                if (copySauce.usersLiked[i] == req.userId) {
                    console.log(`Userid found in like array`);
                    //delete id dislike array likeArray.splice(i,1);
                    copySauce.usersLiked.splice(i, 1);
                    //update dislike
                }
            }
            console.log("COPY SAUCE AND SAUCE");
            console.log(copySauce);
            console.log(laSauce);
            //Update Sauce id database
            copySauce.usersLiked.splice(2, 2);
           //Update Sauce id database
            // SauceModel.updateOne({_id : laSauce._id} , {...copySauce})
            // .then(res.status(200).json({message :"Sauce polling correctly updated"}))
            // .catch(res.status(400).json({message : "can't update Sauce"}));
 */  