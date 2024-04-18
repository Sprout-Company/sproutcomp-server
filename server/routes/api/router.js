const router = require("express").Router();

const tokenVerifier = require("../../middlewares/apiVerifier.js");

const v1 =  require("./v1/v1.js");

router.post("/v1" , tokenVerifier , v1);

module.exports = router;