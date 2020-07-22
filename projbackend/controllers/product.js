const Product = require("../models/product");
const formidable = require("formidable");// Refer, https://www.npmjs.com/package/formidable
const _ = require("lodash"); // refer lodash.com, 
// _ is for private variable, i.e. if we want to have a variable
// but don't wnat to use it much explicitly. 
// thats how it was used in lodash's site.
const fs= require("fs");// to access the path of image/file.

exports.getProductById = (req,res,next,id)=>{
    // next coz its middleware, id coz its a param method.
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
        //destructure the fields which is inside a callback in parse.
        // coz we don't want to call it again and again like fields.name, fields.someThing.
        // example: const{price} = fields; //using this fields.price can be accessed by price.
        // check model to see which fields can we destruct from product.
        const {name,description,price,category,stock} = fields;
        //good way to put restriction is through validation. put them up directly upfront in the route itself.
        //below is another way to put simple restriction
        if(
            !name || !description || !price || !category || !stock
        ){
            return res.status(400).json({
                error: "Please include all fields."
            });
        }

        // it probably means a user is adding all the values described in ProductSchema 
        // and then we are passing that info in Product() to create new one.
        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size >(1024*1024*3)){//3mb is written as= 1024*1024*3=3000000
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
        //console.log(product);

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

exports.getProduct =(req,res)=>{
    //notice coz of getProductById method , we are already storing things in req.product
    //and that will get executed coz of existence of :productId in URL.in product.js routes.
    // if we are serving something like mp3 or photos, then are not being directly served
    // on a "get" request. coz this mp3/photos can be tricky and bulky to grab from
    // DB.so we will do similar thing like when returning users we were putting salt 
    //and password as undefinied.
    req.product.photo = undefined;
    //we have locally undefined this photo, so it rest of things will be shown to user
    // smoothly.
    return res.json(req.product);
};
// we can create a backend which loads photo while above method sends rest of the things.

//middleware, this is to optimize the time it takes to load a photo.
exports.photo = (req,res,next)=>{
    // notice in db of in resturn response when we added photo,the binary data of photo
    //had a key of data:[].below line means if thr is some data then only we return data.
    if(req.product.photo.data){
        //we are just settng Content type of our data here.
        //res.set is used to set the type of response.
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

//delete controllers
exports.deleteProduct = (req,res) => {
    // remember we got this req.product czo of our middle getProductById.
    let product = req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:`Failed to delete the product.${product.name}`
            });
        }
        res.json({
            message:"Deletion was successful",
            deletedProduct
        });
    });
};

//update controllers
exports.updateProduct = (req,res) => {

    //we just COPIED whole part of createProduct and edited some things from it.
    // coz we will have the same ui for creating product and for updation of product.
    // so in updation page, we will fill all the fields from the info we get from DB.
    // so it will be like editing a prefilled fields in ui and then clicking on Save.

    //notice this(below) will be the updation form, so the fields it will give will be
    //the new values of those fields.
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
        

        // it probably means a user is adding all the values described in ProductSchema 
        // and then we are passing that info in Product() to create new one.
        let product = req.product;
        //remember we are getting this by the middleware method getproductById which is
        // getting called coz of presence of productId in URL. coz we hav eset router.params()

        //Updation code
        //For _.extend,refer https://lodash.com/docs/4.17.15#assignIn
        // it will basically involve updated value and old values.
        product=_.extend(product,fields);

        //handle file here
        if(file.photo){
            if(file.photo.size >(1024*1024*3)){//3mb is written as= 1024*1024*3=3000000
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
                    error:"Updation of product failed."
                });
            }
            res.json(product);
        });
    });
};

//product listing
exports.getAllProducts = (req,res)=>{
    // we have imported "Product" model, we will use it here.
    //photos can throw a response which can be a bit late/slow.
    // so we added a select method in which can tell things we want or not want.
    // In select, - is to tell i don't want to select this.
    // limit to show limited number of product.,
    //we take limit from user, if its not empty then converting it in INT otherwise its 8
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
    let sortBy = req.query.sortBy ? req.query.sortBy :"_id";//id is written like this only _id
    //for sort([[]]), yes there are lists inside lists.
    //we have to provide multiple properties here, 
    //1. how we want to sort.
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            res.status(400).json({
                error:"No product FOUND."
            })
        }
        res.json(products);
        // we can just throw all the products and in front end we can loop through it.
    });
};

exports.getAllUniqueCategories =(req,res)=>{
    //using our Product model we have imported from productSchema.
    //distinct takes 3args 1st is field,2nd options,3rd callback.
    Product.distinct("category",{},(err,category) => {
        if(err){
            return res.status(400).json({
                error:"NO category found."
            })
        }
        res.json(category);
    });
};

exports.updateStock = (req,res,next) => {
    //next coz it is a middleware.
    //Rememder, we hav ea cart and there can be 'N' number of products in cart.
    //so I want to loop through this cart and grab every single item from the cart.
    let myOperations = req.body.order.products.map(prod => {
    //req.body.order so in order thr gonna be many products so .products then want to loop
    // thorugh every product so .map and in every product I want to perform two things
    // increase sold and decrease sotck.
    return {
        updateOne:{
            //updateOne is function of Bulkwrite., In filter we are filtering on basis of id.
            // i.e. id of prod._id.
            filter: {_id:prod._id},
            //after getting that product form filter we will perform update.
            update: {$inc:{stock:-prod.count,sold:+prod.count}}
            // in update '$' symbol whenever we have to update.
            //prod.count will be coming from frontend as in how much product have been sold.
            //+ in sold ofc , whenever purchase is being made, - for stock since stock of that 
            //product will go down as N number of that product is sold.
            }
        };
    });
    //Refer mongoose bulkwrite=. https://mongoosejs.com/docs/api.html#model_Model.bulkWrite
    //1st.arg operations want to perform,2ndarg options if any otherwise null,3rd callback.
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed."
            });
        }
        next();
    });
};