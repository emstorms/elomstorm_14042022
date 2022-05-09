//Check if the user id that send the request is the same as the subbscription's one
const verif_user_token = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
    try {
        //enregistre l'autorisation bearer Puis Transfert (next)

        res.header("Access-Control-Expose-Headers", "Authorization");
        res.locals.auth = true;
        //Split the token from Req Authorization String
        console.log("\n<<<<<<<<<<IN VERIFICATION TOKEN");
        console.log("\ntypeof req.headers")
        console.log(typeof req.headers);
        console.log("\n<<<<<<<<<<req.headers");
        console.log(req.headers.hasOwnProperty("authorization"));
        //IF The request has not header authorisation property
        if (!req.headers.hasOwnProperty("authorization")) {
            //Throw error // Request may be sent from bad form or source
            res.status(400).json({ message: "PAs de autorize dans la requete" });
            throw ("Veuillez à Utiliser le formulaire de connexion pour vous connecter avant de poursuivre");
        } else {
            const is_token = (req.headers.authorization.split(' ')[1]);
            console.log(is_token);
            console.log("Decode");
            console.log(verif_user_token.verify(is_token, "RANDOM_TOKEN_SECRET"));
            // const decode = verif_user_token.verify(is_token,process.env.TOKEN_ENCODE_CODE);
            const decode = verif_user_token.verify(is_token, "RANDOM_TOKEN_SECRET");
            console.log("userID");
            console.log(decode.userId);
        }
        
        // console.log(typeof is_token);
        // if(typeof is_token == undefined){
        //     console.log("Token is undefined");
        // }else{
        //     console.log("Token is not present");
        // }

        // console.log(is_token);
        // console.log("Decode");
        // console.log(verif_user_token.verify(is_token, "RANDOM_TOKEN_SECRET"));
        // // const decode = verif_user_token.verify(is_token,process.env.TOKEN_ENCODE_CODE);
        // const decode = verif_user_token.verify(is_token, "RANDOM_TOKEN_SECRET");
        // console.log("userID");
        // console.log(decode.userId);
        // const token_id = reqAutorization.split(' ')[1];
        // res.json({message :`message => le token est ${token_id}`});


        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({ error: new Error("Invalid test Token validator") });
    }

}