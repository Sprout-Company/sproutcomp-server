const router = require("express").Router();

const crypto =  require("./crypto/router.js");

const config_wallet = require("./wallet/config_wallet.js");

router.use("/crypto" , crypto);

router.post("/config_wallet" , config_wallet);

module.exports = router;