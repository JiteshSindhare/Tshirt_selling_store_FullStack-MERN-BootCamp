const express = require("express");
const router = express.Router();
const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")

// this field will populate request.profile with that.when there is a route like :*/id/anything it will
// interpreted as userid and this method will automatically populate a req.profile object with user object
// which is coming up from the db. check below link to understand populate better
// https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean#:~:text=populate()%20function%20in%20mongoose,an%20object%20as%20an%20input.

router.param("userId",getUserById);

// this is like to get a user his/her profile, he should be signedin,authenticated.
// both isSigned and isAuthenticated are middlewares so they can be inserted anywhere in the route.
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);

// notice both above and below method/route looks same but differ only in .get or .put.
// the :UserId we are using is also in the router.param() some lines above and it is like middle ware, 
// and with that the getUserById in controller is /getting req.profile/user so we can identiy user by its id.
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);

// ofc user needs to be singedin and authenticated to see his order list.
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);

//router.get("/user",getAllUsers); Sample route of getAllUsers of controllers., need to add it in controller as well if uncommenting.
module.exports = router;
//it will export all the routes we will make in this file.