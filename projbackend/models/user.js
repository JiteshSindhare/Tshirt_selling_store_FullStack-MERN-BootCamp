var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
  
 // above lines are just the libraries we require, we are calling those libraries.
  var userSchema = new mongoose.Schema({
  name:{
      type: String,
      required: true, // required means database always expects that this value is going
                        // to come without that it will throw an error.
      maxlength:32,
      trim: true // it will trim extra spaces.
  },
  lastname:{
    type: String,
    maxlength:32,
    trim: true // it will trim extra spaces.
  },
  email:{
      type: String,
      trim: true,
      required: true,
      unique: true // since email id of all user needs to be unique. if there is a
                // duplication then we will get informed by mongodb.
  },
  userinfo:{
    type: String,
    trim: true,
  },

  encry_password:{
      type: String,
      required: true,

  },
  salt: String, // it is for password
  role:{ // also can be called as privileges. 
    type: Number,//general rule is  the HIGHER the number that role has more privileges.
    default: 0, // this is user.
  },
  purchases: {
      type: Array,  //as this will be list/array of things a user purchase.
      default:[], // that is nobody buys anything initially.
  }
  }, {timestamps: true} // whenever we create a new entry it records the exact time it was 
  // created and store it in database.
  );

  userSchema.virtual("password")
      .set(function(password){
          this._password=password //  '_' is used when private variable is used.
          this.salt= uuidv1(); // we want to populate the salt which is getting passed as string 
                    // to encrypt. 
          this.encry_password= this.securePassword(password);
          // we are entering password in this virtual field "password". then
        // encry_password variable is getting a hashed value by the securePassword method.
      })
      .get(function(){
          return this.password
      }) // this is when someone wants to take this fields back.
  
  // we are making a method in our schema to encrypt password which will be entered
  // by user and then store in our mongodb.
  userSchema.methods = {
      // we need a method which can match there hash value to check when
                // we want to authenticate the user.
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return ""; // it is returning "" (empty) and in mongodb empty pass
                                // cannot be stored.
        try{
            // for the things in this block visit site: 
            //https://nodejs.org/api/crypto.html#crypto_crypto
            // we are just using crpto api to encrypt password of user then storing in database.
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');

        }catch (err){
            return "";
        }
    }
  }
  // prototype for mongoose.model is ("a nickname for our schema",name of our schema)
  module.exports = mongoose.model("User",userSchema);