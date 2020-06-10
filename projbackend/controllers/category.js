const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id) => {// next coz it is a middleware, id coz thats how we do in params(this method is being used in param/that is to get parameter).
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found in DB."
            });
        }
        req.category = cate; // this req.category is going to be populated by "cate" which we will get by  category(probably) id.
        next();
    });  
};

exports.createCategory = (req,res)=>{
    // this will create category and save it in db.
    //we will create a simple category and we will extract it form user body.
    const category = new Category(req.body);//req.body will populate our model.'
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save category in DB, or duplicate category."
            });
        }
        res.json({category});
    });
};

exports.getCategory = (req,res)=>{
    return res.json(req.category); // we are getting this req.categoey by method getCategoryById.
};

exports.getAllCategory = (req,res)=>{
    //when we user .find() without providing any id then it gives everything.
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No categories found."
            });
        }
        res.json(categories);
    });
};

exports.updateCategory = (req,res)=>{
    // notice category schema in models in category.js,
    // that there is only one thing i.e. name.
    const category = req.category; // we are able to get req.category coz of the middleware,getCategoryById which is getting executed coz of params in category.js routes.
    //editing category . name below then in category.save, saving that new name.
    category.name = req.body.name; // this req.body comes from frontend or postman. 

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to update category."
            });
        }
        res.json(updatedCategory);
    });
};

//avoiding word exact delete, coz delete is a proprietary operation being performed in mongo.
exports.removeCategory = (req,res)=>{
    const category = req.category; // we are able to get req.category coz of the middleware,getCategoryById which is getting executed coz of params(:categoryId is making that method call) in category.js routes.

    category.remove((err,category)=>{
        // this category will be the category/value deleted from db.
        if(err){
            return res.status(400).json({
                error:"Failed to delete this category."
            });
        }
        res.json({
            message:`Successfully deleted ${category.name}.`
        })
    })
};