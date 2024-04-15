const router = require("express").Router();

const crypto =  require("./crypto/router.js");

router.use("/crypto" , crypto);

module.exports = router;