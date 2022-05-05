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
//Try morgan that log request details
const morgan = require('morgan');
// console.log(morgan);
app.use(morgan('dev'));


//HTTP Request

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  //POST looking for message : string. Het hashed pasword and add in database





module.exports = app;