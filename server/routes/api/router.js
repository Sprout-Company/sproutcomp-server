const router = require("express").Router();

const verifyToken = require("../../middlewares/verifyToken.js");

const v1 =  require("./v1/v1.js");

router.post("/v1" , verifyToken , v1);

module.exports = router;