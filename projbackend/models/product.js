const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema; // i can refer to this objectId to whatever schema
                                    // I have created. that means we can now tell a type as
                                    // another object which we created in a schema.

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength:32,
    },
    description:{
        type: String,
        trim: true,
        required: true,
        maxlength:2000,
    },
    price:{
        type: Number,
        required: true,
        maxlength:32,
        trim: true,
    },
    // since every single t-shirt or product is going to be in a category.
    category:{
        type: ObjectId, // this ObjectId can come from other models like user or category
                        // so thats why there is a variable in line 2.
        ref:"Category", // notice it is named exactly as module.exports(last line) of
                        // "category.js"
        req: true,
    },
    stock:{
        type: Number,
    },
    sold:{
        type:Number,
        default:0,// coz whenever we are creating a product. its not sold initially.
    },
    photo:{// there are other ways in which we don't put photos in our database coz it 
            // makes it a bit heavier. In some cases this photo or data are stored in
            // folder(probably check firewall for it) or cloud( AWS S3 bucket ) 
            //and we pull address of that.
        data: Buffer,
        contentType: String,
    }   
},{timestamps: true}); // it adds created and updated time in the db.

module.exports = mongoose.model("Product",productSchema);