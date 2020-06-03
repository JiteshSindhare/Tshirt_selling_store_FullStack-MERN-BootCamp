const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
name : {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true
}
},{timestamps: true} // whenever we create a new entry it records the exact time it was 
                // created and store it in database.
);

module.exports = mongoose.model("Category",categorySchema);