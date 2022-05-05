const bcrypt = require('bcrypt');
// const User = require('../models/UserModel');
const UserModel = require('../models/UserModel');
// const token = require('jsonwebtoken');

/*
//connecting to account
exports.login = (req,res,next) =>{
    //chek in DB if the email exist. 
        //If yes compare the password using bcrypt.compare
        //return useid and a token
    User.findOne({email : req.body.email})
      .then(email => {
          if(!email){
              return res.status(401).json({message:'Vous n\'avez pas encore de compte, souhaite vous en créer un autre?' });
          }
          //if user exist compare password
          bcrypt.compare(req.body.password, email.password)
            .then(isCorrectPasswd => {
                res.status(200).json({
                    userId:email._id,
                    token: token.sign(
                        {userId:email._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn:'24h'}
                    )
                })
            })
            .catch(error => res.status(400).json({error}));
      })
      .catch(error => res.status(400).json({error}))
};
*/


//subscription
exports.signup = (req,res) =>{
    //hash then save the user model
    // bcrypt.hash(req.body.password,10)
    // .then(hash => {
    //     const user = new userModel({
    //         email:req.body.email,
    //         password:hash
    //     })
        //saving the user
        // user.save()
        // .then(()=> res.status(201).json({message :"Votre compte a bien été créee"}))
        // .catch(error => res.status(400).json({error}))
        // console.log("LOG USer ==>");
        // console.log(user);
    // })
    // .catch(error => res.status(500).json({error : error}));
    // .catch(console.log(error));
    console.log(req.body);
    res.json({message:"quoi"});
    
};


