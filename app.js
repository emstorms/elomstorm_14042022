const express = require('express');
const mongoose = require ('mongoose');
const UserModel = require('./models/UserModel');
const bcrypt = require('bcrypt');
const app = express();
//Connexion to db
  mongoose.connect('mongodb+srv://tutomongo2:tutopass78@cluster0.goouw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// can get Json data
app.use(express.json());
//HTTP Request

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
    //POST looking for message : string. Het hashed pasword and add in database

    app.post('/api/auth/signup', (req,res) => {
        //insert in db if not exist already
        UserModel.findOne({email :req.body.email})
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

        console.log("In signup function");
        res.json({message:'OK c ok'});
        // next();
        
    })



module.exports = app;