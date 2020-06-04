// Refer: https://expressjs.com/en/guide/routing.html, express.Router

var express = require('express');
var router = express.Router();
const {signout} = require("../controllers/auth");// remember .. is to go back in directory

//Example
//In router.get("/signout",(req,res)=>{}); res is response, so we are 
//sending a response if someone is visiting route /signout
// sequence of req,res should be same as in this func.
//res.send("user signout");
//So when somebody will go to route "/signout" we will send a callback
// which is 2nd argument(arrow/lambda func).
router.get("/signout",signout); // we can also repalce singout here
// and put the value os signout here from (req,res) like shown
//in example.

module.exports = router; // links or resquest associated with the router
// of this file are being thrown by the above code. then we need to import
// it in another file like importing some other var/func in py.