const Product = require("../models/product");
const formidable = require("formidable");// Refer, https://www.npmjs.com/package/formidable
const _ = require("lodash"); // refer lodash.com, 
// _ is for private variable, i.e. if we want to have a variable
// but don't wnat to use it much explicitly. 
// thats how it was used in lodash's site.
const fs= require("fs");// to access the path of image/file.

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
    let form = new formidable.IncomingForm();
    //it expects 3 parameters, 1. error
    //2.fields(name,des,price ,etc fields in form), 3.files.
    form.keepExtensions = true;//coz we want to save if our file are in jpeg,png etc.
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                //if there is a error here, there is high chance that the problem is in the file itself.
                error:"problem with image."
            });
        }
        //TODO: handle fields, restrictions on field.
        // it probably it means a user is adding all the values described in ProductSchema 
        // and then we are passing that info in Product() to create new one.
        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size >(1024*1024*3)){
                return res.status.json({
                    error:"File size too big."
                });
            }
            //here we have to mention full path of file.
            // pass fs.readFileSync() on formidable to grab us exact path of it.
            product.photo.data=fs.readFileSync(file.photo.path);
            // we have to mention content type for database.
            product.photo.contentType = file.photo.type;
        }
        // save to the DB.
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error:"Saving tshirt in DB failed."
                });
            }
            res.json(product);
        });
    });
};
