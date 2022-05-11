const express = require('express');
const mongoose = require ('mongoose');
const UserModel = require('./models/UserModel');
const bcrypt = require('bcrypt');
const authConroller = require('./controllers/authController');

//Routers FIles
const userRoutes = require("./routes/authRoute");
const sauceRoute = require("./routes/sauceRoute");

const verifications = require("./middelware/verifications");
//Chemin static pour les images
const path = require("path");

const app = express();

// can get Json data
app.use(express.json());
//Connexion to db
//Try morgan that log request details
const morgan = require('morgan');
  
  mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWD}@${process.env.DB_CLUSTER}.goouw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// console.log(morgan);
app.use(morgan('dev'));


//HTTP Request
//https://stackoverflow.com/questions/56328474/origin-http-localhost4200-has-been-blocked-by-cors-policy-in-angular7
var cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();

  });

            /*********
              ROUTES
            **********/
  //using router
  
  /***SAUCES-IMAGE***/
  //Path for Image Sauce
  app.use('/images_folder',express.static(path.join(__dirname,'images_folder')));
  // app.use('/images',express.static(path.join(__dirname,'images')));
  
  /***AUTHENTIFICATION***/
  app.use("/api/auth",userRoutes);
  
  /***SAUCES***/
  //Using Sauce request
  app.use("/api/sauces",sauceRoute);
 
  //POST looking for message : string. Het hashed pasword and add in database

  // app.post('/signup',authConroller.signup);
  // app.post('/login',verifications.checkToken,authConroller.login);
  // app.post('/login',verifications);

  




module.exports = app;