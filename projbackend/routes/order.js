const express=require("express");
const router = express.Router();
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth"); 
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");

const {getOrderById,
    createOrder,
    getALLOrders,
    getOrderStatus,
    updateStatus
 } = require("../controllers/order");

//params- kind of like parameter extractor.
router.param("userId",getUserById);
router.param("orderId",getOrderById);


//Actual routes
//Create
    //not isAdmin coz ofc anybody can palce the order.
    //we are doing this in this order coz I am assuming that amount has been successfully 
    //deducted from user account, means payment was successful.
router.post("/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
    );

//Read
router.get("/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getALLOrders
);

//status of order
router.get("/order/status/:userId",isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);
router.put("/order/:orderId/status/:userId",isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);

module.exports = router;