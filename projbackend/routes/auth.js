// Refer: https://expressjs.com/en/guide/routing.html, express.Router

var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator'); // check expres validator.
const {signout,signup,signin,isSignedIn} = require("../controllers/auth");
// remember .. is to go back in directory


router.post("/signup",[
    check("name","name should be atleast 3 char.").isLength({min : 3}),
    check("email","email is required.").isEmail(),
    check("password","should be atleast 3 char").isLength({min : 3}),
    // we can define min and max both inside isLength({...}).
],signup);

router.post("/signin",[ // keeping router func as post only, sicne in sign in
    // we will take email and pass from user.
    check("email","email is required.").isEmail(),
    check("password","password field is required").isLength({min : 1}),

],signin
);

//Example
//In router.get("/signout",(req,res)=>{}); res is response, so we are 
//sending a response if someone is visiting route /signout
// sequence of req,res should be same as in this func.
//res.send("user signout");
//So when somebody will go to route "/signout" we will send a callback
// which is 2nd argument(arrow/lambda func or name of a func in below case).

router.get("/signout",signout); // we can also repalce singout here
// and put the value os signout here from (req,res) like shown
//in example.

// router.get("/testroute", isSignedIn, (req,res)=>{
//     // this auth has holds an _id, which was given to the user while siginin
//     res.json(req.auth);// this auth is same as we spelled in userProperty of isSigned in auth.js of controller.
// });

module.exports = router; // links or resquest associated with the router
// of this file are being thrown by the above code. then we need to import
// it in another file like importing some other var/func in py.