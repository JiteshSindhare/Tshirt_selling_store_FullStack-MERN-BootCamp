// remember to name it same as the file in route for whom this controller
// file is being made.

// below variable should named as User because we exported User schema with same name.
const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


//module.export just exports a single thing if we want to export more then use below
// kind of methods.
exports.signup = (req,res) => {
    //VALIDATING user before adding it in database.
    // this validator binds the validation result we did in auth.js in routes,
    // with the request body.
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // check error that are being thrown from the database or backend itself.
        /** this is how we get error in validator.
         * Example:
         * {
        "errors": [{
            "location": "body",
            "msg": "Invalid value",
            "param": "username"
            }]
            }   
         */
        return  res.status(422).json({
            // notice in example errors gives an array. so errors.array() convert that
            // in array.
            error: errors.array()[0].msg,
            error_in: errors.array()[0].param
        })
    }
    const user = new User(req.body);// req.body is to get all values of User data.
    // now variable user can access method of mongoose db.
    // now we have saved the user using below func user.save()
    // and doing a callback to provide a response that user's data is saved.
    // this saving gives us two objects back. 1. err 2.user(object saved in db.)
    user.save((err,user)=>{
    if(err){
        // sending error code since there is an error.( check error code
        // list for this.)
        return res.status(400).json({
            // sending json coz in frontend if json are parsed nicely from backend,
            // then it good for frontend to craft an error msg based on this response.
            err: "NOT able to save user in DB.",
            msg : err// my thought: can be used to debug error or show what is the problem.
        }) 
    }
    res.json({ // sending back selected field which is safe to show.
        // notice we get many field in postman when we throw only res.json(user).
        name: user.name,
        email: user.email,
        id: user._id 
        });
    });
};

exports.signin = (req,res) =>{
    //we just need two information now from req.body, we will extract email and pass.
    const {email,password} = req.body; // destructuring of data.
    //Validation check.
    const errors = validationResult(req)// this is from express-validator
    if(!errors.isEmpty()){
        return  res.status(422).json({
            error: errors.array()[0].msg,
            error_in: errors.array()[0].param
        })
    }
    //findOne method finds exactly one match from the database
     // we ahve destructured email above thats why able to pass here directly.
    User.findOne({email},(err,user) =>{
        // this callback in such cases always sends back err(-ve response) or user(+ve response).
        if(err || !user){
           return res.status(400).json({
                error:"USER email does not exists."
            })
        }
    // if user is beind authenticated, then we need to provide on what basis, we want to check this authentication( see authenticate method in user.js).
    if(!user.authenticate(password)){
        return res.status(400).json({
            error: "Email and password do not match."
           })
        }
    //if above two cases are fine then we can create token, based on any key value pair.
    const  token = jwt.sign({_id: user._id},process.env.SECRET)
    // put token in cookie, COOKIE is like a key:value pair.
    // res.cookie(key,value,expiry time/date)
    res.cookie("token",token,{expire : new Date()+99999})
    //send response to frontend to know if this was an error or success. coz above resposnes
    // were to the browser.
    // doing destructuring coz we don't want to send the whole thing(user) coz it has user etc.
    const {_id,name,email,role} = user;
    // so that we know which user it is , and what authrotis does it have (role will tell that).
    return res.json({token,user : {_id,name,email,role}})
    // so that frontend can set this token in local storage.
    })
};

exports.signout =  (req,res) => {  
    // we have this clearCookie method coz we have cookieParser in app.js
    res.clearCookie("token");
    res.json({
    message: "user signout successfully"    
    });
};   

// Protected Routes
exports.isSignedIn = expressJwt({ 

    secret: process.env.SECRET,
    //cookie parser allow us to set some properties in user's browser
    userProperty: "auth"// it adds this new property inside the request which is userProperty: "auth".

    //This method is a custom middleware and we are not writing "next()" here because
    // we are writing this in expressJwt and that already has a "next()" method.
});