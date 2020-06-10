const express=require("express");
const router = express.Router();

const {getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory
} = require("../controllers/category");

const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth"); // a user will be able to create category if he/she is signedIn,authenticated and only admin should be allowed.
const {getUserById} = require("../controllers/user");

//params
//now anytime it will see a userId in a URL/parameter it will populate our profile field(means it will find that profile with that userID).
router.param("userId", getUserById);// thi .params is how we get a parameter from a URL.
router.param("categoryId", getCategoryById);

//actual routes goes here.
// validated and authenticated users can only create category.
//coz we are posting something in db. and using parameter userId coz we want to validate user.
// CREATE route.
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);
// when we see a :categoryId which is written in router.param atline 11, then that parameter will launch and treat it as parameter
// and then getCategoryById method gets called.

//Read routes.
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//Update Route.
router.put("/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);

//Delete Route.
router.delete("/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
);

module.exports=router;