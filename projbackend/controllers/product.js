const Product = require("../models/product");
const formidable = require("formidable");// Refer, https://www.npmjs.com/package/formidable
const _ = require("lodash"); // refer lodash.com
// _ is for private variable, i.e. if we want to have a variable
// but don't wnat to use it much explicitly. 
const fs= require("fs");

exports.getProductById = (req,res,next,id)=>{// next coz its middleware, id coz its a param method.
    //we can have many method in between to use other models to filter something.
    // example before .exec(), we can have .sort().populate().anyMethodinLibrary().exec()
    // I want to populate the product based on the category for now.
    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        // this we are just populating a variable with the product we got by id,
        // so that we will be able to use that variable in other places/method.
        req.product = product;
        next();
    });
};

exports.createProduct = (req,res)=>{
    //
};