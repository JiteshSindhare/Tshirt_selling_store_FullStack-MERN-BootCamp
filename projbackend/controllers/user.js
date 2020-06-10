const User = require("../models/user");// imported user form models user.
const Order = require("../models/order");

//export method so params can be handled, and import it in app.js or any other palce

exports.getUserById = (req,res,next,id) => {
    //findByid can work exactly as findOne., chained it to execution method so it does execution
    // in database callback always return err and object/user itself.
    User.findById(id).exec((err,user) => {
        if(err || !user){ // !user is when there is no such user/email in db.
            return res.status(400).json({
                err:"No user was found in DB."
            });
        }
        //this block is when we found user.
        // we can store this user into req object.we can create an object inside the request which will be called profile and sotre user inside profile.
        req.profile = user;
        next();
    });
};
// getUserId(above method) works with the params coz there is a id there.
//in this method below we want to grab user when somebody calls this method.
exports.getUser = (req,res) =>{
    // TODO: get back here for password.
    // if we simple send req.profile then, it sends Salt and encry_password from db as well.
    // so for that we define their values as something else before sending it.
    // we can hide variable by both of the below two methods.
    // doing this here only makes their value blank or undefined locally in user's profile not in db.
    req.profile.salt=undefined;// this won't even show the field.
    req.profile.encry_password="";// this will show the field as blank.
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);
    //sending profile or request in response.
};

exports.updateUser = (req,res)=>{
    // coz we want to find a particular id and update in it in this method.
    User.findByIdAndUpdate(
        // if id is not found then there will be an err response by the below line, so can't send not found id error below in error section.
        {_id:req.profile._id},
        // the values that we want to update is being sent with '$' symbol, in $set:to be precise.
        {$set:req.body},// i want to update anything/everything which is in req.body, and req.body is where frontend will come into play.
        //we are providing new field here(below), so new = true 
        {new:true,useFindAndModify:false},//see this parameters in documentation, this are compulsory parameter whenever we are using FindByIdAndUpdate().
        // now below is just a callback
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this user."
                })
            }
            // we were using req.profile in getUser or getuserById method coz we were accessing user as req.profile(to not get confused b/w user and requesters profile) now we are directly accesing user.
            user.salt=undefined;// this won't even show the field.
            user.encry_password=undefined;// this will show the field as blank.
            user.createdAt=undefined;
            user.updatedAt=undefined;
            res.json(user)
        }
    );
};

exports.userPurchaseList = (req,res)=> {
    // we can get purchase list from user models/collection as well but we are just storing 
    // there the information which is gonna be linked up in OrderSchema
    // , but for now want to do it from OrderSchema.
    // notice we are getting user in Order Schema, open order.js in models. we are mapping/referencing user with models using user.
    // this are the order which was pushed in the orderSchema by a particular User we will recognise user by id so we are using req.profile._id

    // whenever we are referencing something which is in 
    //different collection like here user is in order. THEN USE POPULATE.
    //1st arg= which model/object we want to update. 
    //2nd-arg= name of fields we want to bring in example:"id name lastname ",
    // yes separated by space.
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order is placed by you."
            });
        }
        return res.json(order)
    });
};

exports.pushOrderInPurchaseList = (req,res,next)=>{
    //in user.js in models, purchase is a type of Array, so we will use a method of push in that array.
    let purchases = []
    // this info is going to come from req.body and we will be going to call this from frontend as it is order.
    // notice order.js and schema in that file.
    //assuming there are many products(so using order.products) in a user's cart. so in order whatever the products we are gonna have. we are gonna loop through there. we will pick up individual information from their.
    //  we will create an object from it. and we will be pushing it inside the purchases.
    req.body.order.products.forEach(product=>{
    //products is an entire list, in which there is an individual product that i want to look through it.
    // this(req.body.order.products) is majorly depend on the frontend of the application.
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        });
    });
    // Store above local array(purchases) in DB.
    User.findOneAndUpdate(
        {_id:req.profile._id}, // this arg is telling to find one and update based on this _id.
        {$push:{purchases:purchases}},// what do we want to push inside this array, remember update values are being written liie $push , push here coz this is an array.
        // purchases: purchases is we are updating purchases array in User model with our local purchases array.
        {new:true},// new:true means when we use callback then when we get err, object then we get updated Object/user/oder/product.
        (err,purchases) => {
            if(err){
                return res.status(400).json({
                    error:"Unable to save purchase list."
                })
            }
                next(); // means if there is no error then just handover the control to next thing/something else.
            // does not make sense to return anything , coz we are just updating something in our User schema.
        }
    )
}
/** Sample
exports.getAllUsers = (req,res) => {
    // can write below line as User.find({},(err,user)=>{});
    // also can write it as User.find().exec((err,user)=>{});
    User.find().exec((err,user)=>{
        if(err || !user){ // !user is when there is no such user/email in db.
            return res.status(400).json({
                err:"No user was found in DB."
            });
        }
       res.json(user);
    });
};
*/