//Sauce controllers

const { json } = require('express');
const SauceModel = require('../models/SauceModel');
//importation de fileSystem de node >fs<
const fs = require('fs');
// const sauceModel = require('../models/SauceModel');
//Import loading image contollers
/*
const sauceSchema = ({
    userId :{type: String, required:true, unique:true},
    name : {type: String, required:true},
    manufacturer:{type:String, required:true},
    description:{type:String, required:true},
    mainPepper:{type:String, required:true},
    imageUrl:{type:String, required:true},
    heat:{type:Number, required:true ,min:[1,'Heat must be at least 1, you got {VALUE}'],max:[10,'Heat must be at most 10, you gave {VALUE}']}, //set [1,10]
    likes:{type:Number, required:true,}, //set [1,10]
    dislikes:{type:Number, required:true}, 
    userLiked:{type:[String], required:true},
    usersDisliked:{type:[String]} 

})
const testSauce ={
    userId :"Sauceid",
    name : "SauceName",
    manufacturer:"SauceManufacturer",
    description:"SauceDescription",
    mainPepper:"SauceMainPeper",
    imageUrl:"sauceUrl",
    heat:2, //set [1,10]
    likes:3, //set [1,10]
    dislikes:5, 
    userLiked:["SauceUserLiker1","SauceUserLieker2"],
    usersDisliked:["SauceUserDISLiker1","SauceUserDISLieker2"] 

}
const arrSauce =[];
arrSauce.push(testSauce);
*/
exports.listSauce = (req, res, next) => {
    //Return all Sauces In the Db Using SauceModel.Find
    console.log("here we show the list of all Sauces");
    console.log("\nSHOWING REQ.BODY IN list SAUCE controller");
    console.log(req.body);
    SauceModel.find()
        .then(listSauce => {
            res.status(200).json(listSauce);
            next();
        })
        .catch(error => res.status(402).json({ message: "Cant show list of Sauces" }).send(console.log(`ERROR LIST SAUCE ${error}`)));
};

exports.currentSauce = (req, res, next) => {
    console.log(req.params);
    console.log('IN GET SAuce');
    SauceModel.findOne({ _id: req.params.id })
        .then(laSauce => {
            console.log("Sauce Trouvée >>>>>>>>")
            console.log(laSauce);
            res.status(200).json(laSauce);
            // res.status(200).json(laSauce).send(console.log(laSauce));
            next();
        })
        .catch(error => {
            console.log("ERREUR >>>>>>>");
            console.log(error);
            res.status(401).json({ error: error });
        })



};

exports.initializeSauce = (req, res, next) => {
    //Edit correctly the img Url and set  likes and dislikes to zero Then save in database.
    console.log("\n==========SAUUUUUUCE init==========");
    // console.log("REQ.BODY.SAUCE");
    // console.log(req.body.sauce);
    // console.log("===== PArse req is");
    const parse_sauce = JSON.parse(req.body.sauce);
    console.log(parse_sauce);
    delete parse_sauce._id;
    console.log("NEW SAUCE SANS ID =>>>>>");
    console.log(parse_sauce);
    //Creating Sauce
    const newSauce = new SauceModel({

        ...parse_sauce,
        // imageUrl : protocol://Host:port/imageFolder/imagename
        imageUrl: `${req.protocol}://${req.get('host')}/images_folder/${req.file.filename}`,
        // imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //Initializate likes and dislikes to 0
        likes: 0,
        dislikes: 0,
        userLiked: [],
        usersDisliked: []
    });

    console.log("SAUCE URL");
    console.log(newSauce);

    //Save in Database
    newSauce.save()
        .then(laSauce => {
            console.log(`Votre Sauce ${laSauce.name} a bien été créee Sauvegardée`);

            res.status(201).json({ message: `Votre Sauce ${laSauce.name} a bien été créee création` });
            next();
        })
        .catch(err => {
            console.log(">>>Il y a une erreur pendant ma sauvegarde de la sauce<<<<");
            // console.log(err);
            // res.status(400).json(error);
            res.status(401).json({ message: `Error : ${err}` });
        });


};


exports.updateSauce = (req, res, next) => {
    //update the existing sauce with the given id
    console.log("IN SAUCE UPDATE");
    //searching the Sauce to update
    const sauceModified = req.file ?
    {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images_folder/${req.file.filename}`
    }:
    {...req.body};
    SauceModel.updateOne({ _id: req.params.id }, { ...sauceModified, _id: req.params.id })
        .then(() => {
            console.log("PRODUIT EST Bien Modifié");
            res.status(200).json({ message: "Sauce Modifié " });
        })
        .catch(error => res.status(400).json({ error }));
    // SauceModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, imageUrl: `${req.protocol}://${req.get('host')}/images_folder/${req.file.filename}` })
    //     .then(() => {
    //         console.log("PRODUIT EST Bien Modifié");
    //         res.status(200).json({ message: "Sauce Modifié " });
    //     })
    //     .catch(error => res.status(400).json({ error }));

    // res.status(200).json({message : "IN SAUCE Update"});

}

exports.deleteSauce = (req, res, next) => {
    //Delete the current given sauce in Id
    console.log("\n#####in Delete Sauce####");
    SauceModel.findOne({ _id: req.params.id })
        .then(laSauce => {
            console.log("La sauce A supprimer");
            console.log(laSauce);
            //Trouver le nom de fichier image dans sauce.imageUrl
            const image_name = laSauce.imageUrl.split('images_folder')[1];
            //"Supprimer image dans le serveur avec fs.unlink 
            fs.unlink(`images_folder/${image_name}`, () => {
                //SUpprimer la sauce
                SauceModel.deleteOne({ _id: laSauce._id })
                    .then(() => {
                        res.status(200).json({ message: "Sauce supprimé dans Database ainsi que des les fichiers images correspondant sur le serveur " });
                        next();
                    })
                    .catch(error => res.status(500).json({ error }));
            })


            //  res.status(200).json({message : "La sauce est supprimée"});
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ message: "Cette sauce n'appartient pas au lanceur de la requete, donc impossible de supprimer" });
        });

}




//LIKE ET PAS LIKE
/*const like_bttn = document.getElementsByClassName("likes")[0];
const dislikes = document.getElementsByClassName("dislikes")[0];
*/
function poll(sauceID, userId) {
    //find Sauce

}

// COULD USe MAP for theses
/*function findUserInPoll (userId,likeArray,dislikeArray){
    for( let i = 0; i < likeArray.length; ++i){
        if(likeArray[i] == userid){
            console.log(`UserId  found in like array`);
            //delete in the array
            likeArray.splice(i,1);

        }
    }
*/
function findUserInPoll(res, req, userId, laSauce, poll_choice) {
    let likeArray = laSauce.usersLiked;
    let dislikeArray = laSauce.usersDislikes;
    let nbLikes;
    let nbDislikes;
    const current_poll = poll_choice;
    for (let i = 0; i < likeArray.length; ++i) {
        if (likeArray[i] == userid) {
            console.log(`UserId  found in like array`);
            //delete in the array
            likeArray.splice(i, 1);
            //update likes
            nbLikes = likeArray.length;

        }
    }
    //deleteing in dislikeArray
    for (let i = 0; i < dislikeArray.length; ++i) {
        if (dislikeArray[i] == userId) {
            console.log(`Userid found in like array`);
            //delete id dislike array likeArray.splice(i,1);
            dislikeArray.splice(i, 1);
            //update dislike
            nbDislike = dislikeArray.length;
        }
    }
    //check req like value


    switch (like) {
        case (1):
            //add user in like array
            likeArray.push(req.userId);
            updateSaucePoll(res, req, likeArray, dislikeArray);
            break;
        case (0):
            //add user in dislike array
            updateSaucePoll(res, req, likeArray, dislikeArray);
            break;
        case (-1):
            likeArray.push(req.userId);
            updateSaucePoll(res, req, likeArray, dislikeArray);
            break;
        default:
            throw new Error("Nous ne pouvons pas prendre en compte votre vote");
            break;
    }


}

function updateSaucePoll(res, req, likeArr, dislikeArr) {
    console.log("\n>>>>>>IN UPDATE SAUCE");
    SauceModel.updateOne({_id : req.params.id},{usersLiked : likeArr, usersDislike : dislikeArr,likes : likeArr.length,dislikes : dislikeArr.length})
    .then(() => res.status(200).json({message : "Votre bien pris en compte"}))
    // .catch(error => throw new Error (res.status(401).json({error}));
    .catch(error => {
        // throw new Error ("ERROR IN UPDATE Function"))
        console.log("Error : "+error);
    });

    
}


exports.polling = (req, res, next) => {
    try {
        console.log("IN POLLING");
        console.log(req.body);
        console.log(req.params.id);
        //when like
        SauceModel.findOne({ _id: req.params.id })
            .then(laSauce => {
                console.log("Dans la Sauce ");
                //findUserInPoll(req,res,req.userId,laSauce,req.body.userId);
                console.log(laSauce);
                console.log(req.body);

                /**************
                 * CONTENU DE FindUserInPOll
                 */

                console.log("CONTENU DE FindUserInPOll");
                let likeArray = laSauce.usersLiked;
                let dislikeArray = laSauce.usersDisliked;
                let nbLikes;
                let nbDislikes;
                console.log("dislikeArray");
                console.log(dislikeArray);
                const current_poll = req.body.like;
                for (let i = 0; i < likeArray.length; ++i) {
                    console.log("CONTENU DE FindUserInPOll");
                    if (likeArray[i] == userid) {
                        console.log(`UserId  found in like array`);
                        //delete in the array
                        likeArray.splice(i, 1);
                        //update likes
                        nbLikes = likeArray.length;

                    }
                }
                //deleteing in dislikeArray
                for (let i = 0; i < dislikeArray.length; ++i) {

                    if (dislikeArray[i] == userId) {
                        console.log(`Userid found in like array`);
                        //delete id dislike array likeArray.splice(i,1);
                        dislikeArray.splice(i, 1);
                        //update dislike
                        nbDislike = dislikeArray.length;
                    }
                }

                //check req like value  
                let like = req.body.like;
                console.log("LIKE IS " + like);
                console.log(likeArray);

                switch (like) {
                    case (1):
                        //add user in like array
                        console.log("IN SWITCH LIKE IS " + like);

                        likeArray.push(req.body.userId);
                        updateSaucePoll(res, req, likeArray, dislikeArray);
                        console.log("Array contain");
                        console.log(likeArray);
                        break;
                    case (0):
                        //add user in dislike array
                        console.log("Arrays contain => Like and Dislike");
                        console.log(likeArray);
                        console.log(dislikeArray);
                        break;
                    case (-1):
                        console.log("IN SWITCH DISLLIKE IS " + like);
                        dislikeArray.push(req.body.userId);
                        updateSaucePoll(res, req, likeArray, dislikeArray);
                        console.log("Array contain");
                        console.log(dislikeArray);
                        break;
                    default:
                        throw new Error("Nous ne pouvons pas prendre en compte votre vote");
                        break;
                }

                //Test Showing Sauce
                console.log(laSauce);
                // res.status(200).json({ message: "Vote prise en compte et mise à jour de la sauce" });
            })
            .catch(error => res.status(400).json({ message: "On ne trouve pas la Sauce" }));
            // .catch(error => throw new Error("On ne trouve pas la Sauce" ));

        //delete
        // res.status(200).json({message : "IN POLLING"});
    } catch (err) {
        console.log("TRY CATCH Error ");
        console.log(err);
        res.status(400).json({message : "Erreur lors de la Mise à jour des votes"});
    }

}




/*

GET /api/sauces - Array of sauces
GET /api/sauces/:id - Single sauce 
POST /api/sauces { sauce: String,
image: File }
{ message: String }
Verb
*/