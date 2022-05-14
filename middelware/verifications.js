//Check if the user id that send the request is the same as the subbscription's one
const verif_user_token = require("jsonwebtoken");
const userDb = require('../models/UserModel')
const SauceModel = require('../models/SauceModel');

//We got 2 kind of verification
//First -> only members can see all Sauce check in token if user id exist in db
//second -> only sauce Owner can Modify and delete his Sauce

exports.checkTokenIsMember = (req, res, next) => {
    try {

        if (userExistsWithTokenID(req, res)) {
            //  res.status(200).json({ message: "USer is found" });
            console.log("User found");
            next();
        } else {
            //If TOken does'nt match Db user, throw error
            console.log("TOKEN CHECK FAIL");
            throw new Error("You Have to Create an account to have access to this page");
        }

    } catch (err) {
        console.log("IN CATCH Error IS TROWN");
        res.status(401).json({ message: "AuthoriZE FAIL" }).send(console.log(`Authorize FAILED Error Message ${err}`));
    }

}
/*
?????????????

function getSauceWithId(req,res){
    console.log("in GET SAUCE WITH iD >>>>>>>>");
    SauceModel.findOne({_id:req.params.id})
    .then(laSauce => {
        console.log("Sauce Trouvée >>>>>>>>")
        console.log(laSauce);
        // res.status(200).json(laSauce);
        // // res.status(200).json(laSauce).send(console.log(laSauce));
        // next();
        return laSauce;
    })
    .catch(error => {
        console.log("ERREUR >>>>>>>");
        console.log(error);
        return false;
        // res.status(401).json({error: error});
    })
}*/
exports.authorize = (req, res, next) => {
    try {
        console.log("AUUUTORIZE>>> ");
      const token = req.headers.authorization.split(" ")[1]; 
     
      const decodedToken = verif_user_token.verify(token, process.env.TOKEN_ENCODE_CODE); 
      const userId = decodedToken.userId; 
     
      req.auth = { userId };
       
     
      if (req.body.userId && req.body.userId !== userId) {
          console.log(">>>>>>>IN IF");
        throw "User Id non valable !";                     
      } else {
          console.log(">>>>>>IN ELSE");
        next();
      }
    } catch (error) {
      res.status(401).json({ error: error | "requête non authentifiée !" });
    }
  };

exports.checkIsSauceOwner = (req, res, next) => {
    try {
        //checked by previous middelware if user exists in DB
        //check in Sauce database if the user id match with the token id
        console.log(">>>>>> DANS CHECK IS OWNER ");
        SauceModel.findOne({ _id: req.params.id })
            .then(laSauce => {
                console.log("Sauce Trouvée dans DB>>>>>>>>")
                console.log(laSauce);
                //Check sauce userID with Token ID
                //TOKEN ID
                const is_token = (req.headers.authorization.split(' ')[1]);
                const decode = verif_user_token.verify(is_token, process.env.TOKEN_ENCODE_CODE);
                const tokenUserID = decode.userId;
                console.log("TOKEN ID");
                console.log(tokenUserID);
                if(tokenUserID == laSauce.userId){
                    console.log("OKAY The USer is the owner We can 'next' the middlware");
                    next()
                }else{
                    console.log("IH NOP This user is not the Owner");
                    throw new Error("Erreur =>L'utilisateur n'est pas autorisé");
                }                        
            })
            .catch(error => {
                console.log("ERREUR >>>>>>>");
                console.log(error);
                
                // res.status(401).json({error: error}).send(error);
            })
        // next();
    } catch (err) {
        console.log("[[[[[[[[IN CATCH FOR check sauce is Owner]]]]");
        console.log(err);
        res.status(401).json({ message: "AUthorize FAIL, User IS not OWNER => CAN'T EDIT SAUCE" });
    }
}

function userExistsWithTokenID(req, res) {

    if (!req.headers.hasOwnProperty("authorization")) {
        //Throw error // Request may be sent from bad form or source
        throw new Error("PAs de autorize dans la requete Veuillez à Utiliser le formulaire de connexion pour vous connecter avant de poursuivre");
    }

    const is_token = (req.headers.authorization.split(' ')[1]);
    if (is_token == "") {
        console.log("TOken is empty");
        throw new Error("THat Token is empty");
    }
    //is token is not empty decode
    console.log("\nIM LOGGGING THE TOKEN");
    console.log(is_token);
    const decode = verif_user_token.verify(is_token, process.env.TOKEN_ENCODE_CODE);
    //Searching user in db
    userDb.findOne({ _id: decode.userId })
        .then(theUser => {
            //IF user does'nt exists He cant see all Sauce
            if (!theUser) {
                console.log(" Vous devriez créer un compte avant de poursuivre sur cette page");
                throw new Error("Vous devriez créer un compte avant de poursuivre sur cette page");
            }

        })
        .catch(error => {
            res.json({ error: error }).send(error => console.log(error));
            throw new Error("User does'nt exist in Database");

        })
    return true;

}




exports.checkToken = (req, res, next) => {
    try {
        //enregistre l'autorisation bearer Puis Transfert (next)

        res.header("Access-Control-Expose-Headers", "Authorization");
        res.locals.auth = true;
        //Split the token from Req Authorization String
        console.log("\n<<<<<<<<<<IN VERIFICATION TOKEN");
        console.log("\ntypeof req.headers")
        console.log(typeof req.headers);
        console.log("\n<<<<<<<<<<req.headers has authorization property ????");
        console.log(req.headers.hasOwnProperty("authorization"));
        //IF The request has not header authorisation property
        if (!req.headers.hasOwnProperty("authorization")) {
            //Throw error // Request may be sent from bad form or source
            // res.status(400).json({ message: "PAs de autorize dans la requete" });
            throw new Error("PAs de autorize dans la requete Veuillez à Utiliser le formulaire de connexion pour vous connecter avant de poursuivre");
        } else {
            //Getting the token's string
            const is_token = (req.headers.authorization.split(' ')[1]);
            console.log(is_token);
            if (is_token != "") {
                //is token is not empty decode
                const decode = verif_user_token.verify(is_token, process.env.TOKEN_ENCODE_CODE);
                console.log("DECODING TOKEN => TOken contain");
                console.log(decode);
                console.log(decode.userId);
                console.log("REQ BODY IS");
                console.log(req.body);
                //Compare user in in token with the request id
                /*           if(decode.userId == req.body.id){
                               console.log("We Can continue to end point");
                               res.status(200).json({message : "The requester IS the Owner "});
                               //go to next middlware
                               next();
                           }else{
                               console.log("Requester IS NOT the owner req.body AND request-id is");
                               console.log(req.body);
                               console.log(decode.userId);
           
                               throw new Error("Error :> Requester IS NOT the owner");
                           }
               */
                next();

            } else {
                throw new Error("Token is empty");
            }
            // console.log("Decode");
            // console.log(verif_user_token.verify(is_token, process.env.TOKEN_ENCODE_CODE));

            // console.log("userID");
            // console.log(decode.userId);
        }

        // console.log(typeof is_token);
        // if(typeof is_token == undefined){
        //     console.log("Token is undefined");
        // }else{
        //     console.log("Token is not present");
        // }


        // console.log(decode.userId);
        // const token_id = reqAutorization.split(' ')[1];
        // res.json({message :`message => le token est ${token_id}`});




    } catch (err) {
        console.log(err);
        //??????????????
        // USe newline with backstick
        //............
        res.status(401).json({ error: `${err} \r\n</br>Invalid test Token validator` });
    }

}