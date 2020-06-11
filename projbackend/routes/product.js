const express=require("express");
const router = express.Router();

const {getProductById,createProduct} = require("../controllers/product")
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth"); 
const {getUserById} = require("../controllers/user");

//all of params.
router.param("userId", getUserById);
router.param("productId",getProductById);

router.post("product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
    );
module.exports = router;