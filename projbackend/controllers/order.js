const {Order,ProductCart} = require("../models/order"); 
//importing above things in this way coz we exported two things in Order.js in models.
// so they are getting importing with same name and in this way.

exports.getOrderById = (req,res,next,id) => {
    //we also want to grab name and price of individual product, so we are using populate.
//In populate 1st arg is which field we want to populate. So notice order.js in models
//In orderSchema we have products which is array of productCartSchema. So in products we want product.
// i.e. getting one product from all products in cart.
//2nd is information we want.so we want name,price etc of product notice thr is no comma in between them in code.
//For populate refer: https://mongoosejs.com/docs/populate.html
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            res.status(400).json({
                error:"NO order found in DB."
            });
        }
        req.order = order;
        //populating/storing result we got in order in req.order.
        next();
    });
};

exports.createOrder = (req,res)=>{
    //we want to use request.profile. coz notice in order.js, orderSchema is dependent on user.
    //(has a field for user.)
    //we will get value of req.profile by our middleware param getUserById.
    // req.body.order.user is the method defined in model of order.js.
//so in this we are getting user from req.profile and storing it in req.body.order.user i.e. in user field of our schema order1.
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to save your order in DB."
            });
        }
        res.json(order);
    });
};

exports.getALLOrders =(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:"No orders found in DB."
            });
        }
        res.json(orders);
    });
}; 

exports.updateStatus =(req,res)=>{
    //that is how to get a particular column's path in a schema
    res.json(Order.schema.path("status").enumValues);
};

exports.getOrderStatus =(req,res)=>{
    Order.update(
        //update method takes this parameters then gives a resposne back.
        //locating stuff based on Id, then giving path where to find Id.
        {_id:req.body.orderId},
        //since we are updating so we use ${}
        //telling that to update status which we will get form req.body.status
        {$set: {status: req.body.status} },
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Cannot update order status."
                })
            }
            res.json(order);
        }
    );
};