const express=require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentb");
const {getUserById} = require("../controllers/user");

// Notice in architecture of braintree, first we have to generate token  then 
// we have to submit information. so we need one get route(to generate token) 
// and one post route to submit information.
router.param("userId",getUserById);

router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken);

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated, processPayment);


module.exports = router;