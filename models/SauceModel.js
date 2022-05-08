const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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


module.exports = mongoose.model('SauceModel',sauceSchema);

/*
Data ModelsSauce
● userId : String — l'identifiant MongoDB unique de l'utilisateur qui a créé la
sauce
● name : String — nom de la sauce
● manufacturer : String — fabricant de la sauce
● description : String — description de la sauce
● mainPepper : String — le principal ingrédient épicé de la sauce
● imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur
● heat : Number — nombre entre 1 et 10 décrivant la sauce
● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la
sauce
● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
qui ont aimé (= liked) la sauce
● usersDisliked : [ "String <userId>" ] — tableau des identifiants des
utilisateurs qui n'ont pas aimé (= disliked) la sauce

*/