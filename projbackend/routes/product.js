const express=require("express");
const router = express.Router();

const {getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product")
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth"); 
const {getUserById} = require("../controllers/user");

//all of params.
router.param("userId", getUserById);
router.param("productId",getProductById);

//Create Route.
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

//Read route.
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete route.
router.delete("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

//update route.
router.put("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

//listing route.- its like a page where we see all list of products.
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategories);
module.exports = router;