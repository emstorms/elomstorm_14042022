//Check if the user id send the reques is the same as the subbscription's one
const verif_user_token = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
    try {

        res.header("Access-Control-Expose-Headers", "Authorization");
        res.locals.auth = true;
        //Split the token from Req Authorization String
        console.log("\n<<<<<<<<<<IN VERIFICATION");
        const reqAutorization = req.headers.authorization;
        console.log(req.headers);
        console.log(reqAutorization);
        // res.json({message :"message"});
        next();

    } catch {
        res.status(401).json({ error: new Error("Invalid test Token validator") });
    }

}