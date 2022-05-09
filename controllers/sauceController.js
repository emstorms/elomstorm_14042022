//Sauce controllers

const sauceModel = require('../models/SauceModel');

exports.listSauce = (req,res,next) => {
    //Return all Sauces In the Db Using SauceModel.Find
};

exports.currentSauce = (req,res,next) =>{

};

exports.initializeSauce = (req,res,next) => {
    //Edit correctly the img Url and set  likes and dislikes to zero Then save in database.
    console.log("\n==========SAUUUUUUCE init==========");


    
    res.status(201).json({message: "Sauce en création"});
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