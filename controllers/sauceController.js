//Sauce controllers

const { json } = require('express');
const SauceModel = require('../models/SauceModel');
const sauceModel = require('../models/SauceModel');
//Import loading image contollers

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

exports.listSauce = (req,res,next) => {
    //Return all Sauces In the Db Using SauceModel.Find
    console.log("here we show the list of all Sauces");
    SauceModel.find()
    .then(listSauce => res.status(200).json(listSauce))
    .catch(error => res.status(400).json({message:"Cant show list of Sauces"}));

    // console.log("\nSHOWING REQ.BODY IN list SAUCE controller");
    // console.log(req.body);
    
    // console.log("\nSHOWING REQ.headers IN list SAUCE controller");
    // console.log(req.headers);

    // console.log(Date.now());
    
    // res.status(200).json({message:"OK IN SAUCE LIST"});
    // res.status(200).json({arrSauce});
    // next();
};

exports.currentSauce = (req,res,next) =>{
    console.log(req.params);
    console.log('IN GET SAuce');
    SauceModel.findOne({_id:req.params.id})
    .then(laSauce => {
        console.log("Sacue Trouvée >>>>>>>>")
        console.log(laSauce);
        res.status(200).json(laSauce);
        // res.status(200).json(laSauce).send(console.log(laSauce))
    })
    .catch(error => {
        console.log("ERREUR >>>>>>>");
        console.log(error);
        res.status(401).json({error: error});
    })
    
 
    // next();
};

exports.initializeSauce = (req,res,next) => {
    //Edit correctly the img Url and set  likes and dislikes to zero Then save in database.
    console.log("\n==========SAUUUUUUCE init==========");
    // console.log("REQ.BODY.SAUCE");
    // console.log(req.body.sauce);
    // console.log("===== PArse req is");
    const parse_sauce = JSON.parse(req.body.sauce);
    console.log(parse_sauce);
    //Creating Sauce
    const newSauce = new sauceModel({
        // delete parse_sauce._id,
        ...parse_sauce,
        // imageUrl : protocol://Host:port/imageFolder/imagename
        imageUrl :`${req.protocol}://${req.get('host')}/images_folder/${req.file.filename}`,
        //Initializate likes and dislikes to 0
        likes:0,
        dislikes:0,
        userLiked:[],
        usersDisliked:[]
    });

    //Save in Database
    newSauce.save()
        .then(laSauce => {
            console.log(`Votre Sauce ${laSauce.name} a bien été créee créée`);
            res.status(201).json({message: `Votre Sauce ${laSauce.name} a bien été créee création`});
        })
        .catch(err => {
            console.log(">>>Il y a une erreur pendant ma sauvegarde de la sauce<<<<");
            console.log(err);
            res.status(401).json({message:`Error : ${err}`});
        });
       
        next();
};


exports.updateSauce = (req,res,next) => {
    //update the existing sauce with the given id
}

exports.deleteSauce = (req, res, next) => {
    //Delete the current given sauce in Id
}









/*

GET /api/sauces - Array of sauces
GET /api/sauces/:id - Single sauce 
POST /api/sauces { sauce: String,
image: File }
{ message: String }
Verb
*/