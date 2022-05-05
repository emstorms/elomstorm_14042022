const bcrypt = require('bcrypt');
// const User = require('../models/UserModel');
const UserModel = require('../models/UserModel');
const token = require('jsonwebtoken');


//connecting to account
exports.login = (req, res, next) => {
    try {
        //chek in DB if the email exist. 
        //If yes compare the password using bcrypt.compare
        //return useid and a token
        UserModel.findOne({ email: req.body.email })
            .then(email => {
                if (!email) {
                    return res.status(401).json({ message: 'Vous n\'avez pas encore de compte, souhaite vous en créer un autre?' });
                }
                //if user exist compare password
                bcrypt.compare(req.body.password, email.password)
                    .then(isCorrectPasswd => {
                        res.status(200).json({
                            userId: email._id,
                            token: token.sign(
                                { userId: email._id },
                                `${process.env.TOKEN_ENCODE_CODE}`,
                                { expiresIn: '24h' }
                            )
                        })
                        console.log("=>>>>>>LOGIN THAT iS OK");
                    })
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(400).json({ error }))
    }
    catch(error){
        console.log("LOGIN ERROR");
        console.log(error);
        res.status(400).json({error}).send(console.log(error));
    }
    
};



//subscription
exports.signup = (req, res) => {
    //hash then save the user model
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserModel({
                email: req.body.email,
                password: hash
            });

            //saving the user
            user.save()
                .then(() => res.status(201).json({ message: "Votre compte a bien été créee" }))
                // .catch(error => {console.log("ERROOR\n=======>");console.log(error))
                .catch(error => res.status(400).json({ error }).send(console.log(error)));
            console.log(user);
        })
        .catch(error => res.status(500).json({ error: error }));
};


