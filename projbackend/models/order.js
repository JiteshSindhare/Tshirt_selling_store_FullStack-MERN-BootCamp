const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema; // this is used when we want to refer another
                            // model(table not exactly but kinda ) from our data.
// ObjectId in line 2 is surrounded by { } coz we are destructuring ObjectId from 
// mongoose.Schema. This is a javascript destructuring concept.

// not a good idea to state two schema in one file but still.

//.. There are 4 major ways of writing schemas.
//To understand this open maybe flipkart/amazon and see cart, there see list of products
// and each product has option to increase/decrease no. of that product, cost of that
// product and then total price of all products etc.
const ProductCartSchema = new mongoose.Schema({
    //this products are the products created in "product.js"
    product:{
        type: ObjectId,
        ref:"Product" // referring from "Product.js" check last line of prodcut.js.
    },
    name: String,
    count: Number, // number of products a user is ordering.
    price: Number , // total cost of all the product a user is buying.
});

const  ProductCart = mongoose.model("ProductCart",ProductCartSchema);

const OrderSchema = new mongoose.Schema({
    // notice in any websites cart, there are list of products which a
    // a user buys. so it will be an array/list of products.
    products:[ProductCartSchema],
    transaction_id:{},
    amount: {type: Number},
    address: String,
    updated: Date,
    user:{ // to map products to a user, or say that this module/schema is dependent on user.
        type: ObjectId,
        ref: "User" // reference of a model we are refering an Object to.
    }
},{timestamps: true
});

const Order = mongoose.model("Order",OrderSchema);
// to throw this two schemas "OrderSchema and productCartSchema" at the same time from this 
// file creating this two variables const Order and const ProductSchema.

module.exports = {Order,ProductCart}
