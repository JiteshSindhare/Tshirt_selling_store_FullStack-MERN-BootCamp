const express=require("express");
const router = express.Router();

const {makepayment} = require("../controllers/stripepayment"); 

router.post("/stripepayment",makepayment);
// we can inject middlewares if we wnat it to be accessed only by authenticated
// users or something.
module.exports = router;