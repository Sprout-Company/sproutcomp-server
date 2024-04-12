const router = require("express").Router();

const v1 =  require("./v1/v1.js");

router.post("/v1" , v1);

module.exports = router;