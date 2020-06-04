// remember to name it same as the file in route for whom this controller
// file is being made.
//module.export just exports a single thing if we want to export more then use below
// kind of methods.
exports.signout =  (req,res) => {  
    res.json({
    message: "user signout..."    
    });
};   