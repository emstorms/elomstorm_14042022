//Importer le package express et Http
//le package http permet de créer un server avec la méthode createServer
const express = require('express');
const http = require('http');
// console.log("======> COntenu https");
// console.log(http);
    //test dotenv
const dotenv = require('dotenv').config();


const app = require('./app');
app.set('port',process.env.PORT3000 || 3000);

const server = http.createServer(app);



//Start and Make the The https server listen to connexions
server.listen(process.env.PORT3000);