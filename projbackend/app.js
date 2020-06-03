require("dotenv").config() // this way to require is given in dotenv site.
const mongoose = require('mongoose');
const express= require("express");
const app = express();
/**
mongoose.connect('URL', {useNewUrlParser: true,
 useUnifiedTopology: true});
 if using any other onlien serivce or database something like atlas or mlabs.
 then get that "URL" string from their website.
 */

 mongoose.connect(process.env.DATABASE,{
     // this below lines helps in keeping db connection alive.
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
 } ).then(() => {// then is used in javascript when the func before then is working fine.
     console.log("DB CONNECTED");
 })// catch is used/executes here when func before catch is not working properly.
   

 const port = 8000;

 app.listen( port, () =>{
     // to mention any variable inside backticks `` then we use ${}
     console.log(`app is running at ${port} `);
 } );
