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
            if(is_token != ""){
                //is token is not empty decode
                const decode = verif_user_token.verify(is_token,process.env.TOKEN_ENCODE_CODE);
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

            }else{
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