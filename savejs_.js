app.post('/api/auth/signup', (req,res) => {
    //insert in db if not exist already
/*        UserModel.findOne({email :req.body.email})
        .then(email => {
            //If email already exists exit
            //  if(email)return res.status(401).json({message: "cet email existe déjà veuillez en choisir une autre"});
            //save email and password after hashin db  
            delete req.body._id;              
            bcrypt.hash(req.body.password,10)
            .then(hashed_pwd => {
                const newUser = new UserModel({
                    email:req.body.email,
                    password:hashed_pwd                     
                });
                console.log(newUser);
                //saving user
                newUser.save()                  
                 .then(() => res.json({message:"Votre compte est bien enregistré"}))    
                 .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));
*/
    console.log("In signup function");
    res.json({message:'OK c ok'});
    // next();
    
})