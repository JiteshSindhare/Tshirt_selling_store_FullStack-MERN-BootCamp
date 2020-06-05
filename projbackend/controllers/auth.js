// remember to name it same as the file in route for whom this controller
// file is being made.

// below variable should named as User because we exported User schema with same name.
const User = require("../models/user");
const { check, validationResult } = require('express-validator');

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
exports.signout =  (req,res) => {  
    res.json({
    message: "user signout..."    
    });
};   