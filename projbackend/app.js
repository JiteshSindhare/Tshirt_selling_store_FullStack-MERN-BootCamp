require("dotenv").config() // this way to require is given in dotenv site.
const mongoose = require('mongoose');
const express= require("express");
const app = express();
const bodyParser = require("body-parser");// check docs.
                                        // https://www.npmjs.com/package/body-parser
const cookieParser = require("cookie-parser");// check docs.
                                        //https://www.npmjs.com/package/cookie-parser
const cors = require("cors"); // check docs https://www.npmjs.com/package/cors

//My routes
const authRoutes = require("./routes/auth");// importing it from where we made it,
const userRoutes = require("./routes/user");// single "." is for current directory.
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
/**
mongoose.connect('URL', {useNewUrlParser: true,
 useUnifiedTopology: true});
 if using any other onlien serivce or database something like atlas or mlabs.
 then get that "URL" string from their website.
 */

 //DB connection.
 mongoose.connect(process.env.DATABASE,{
     // this below lines helps in keeping db connection alive.
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
 } ).then(() => {// then is used in javascript when the func before then is working fine.
     console.log("DB CONNECTED");
 })// catch is used/executes here when func before catch is not working properly.

 //Middleware
 app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); 

//My Routes
// since I want to explicitly mention API so I will mention api in route.
app.use("/api",authRoutes); // since this is an authentication route
// so all this routes will be coming form authRoutes(2nd argument)
// this above /api won't work if will just go to localhost:8000/signout
// signout is the path we are taking authRoutes var from(check auth.js 
//for it). so it actually means /api/signout then it will work.
// this below and above route will be like middleware.
// those urls will be like /api/signup or anything that is coming from authRoutes or userRoutes.
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);

//PORT
 const port =process.env.PORT || 8000;

 //Starting a server
 app.listen( port, () =>{
     // to mention any variable inside use backticks `` then we use ${}.
     console.log(`app is running at ${port} `);
 } );
