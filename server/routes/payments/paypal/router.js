const config = require("../../../../config.js");
const router = require("express").Router();
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

const buysc = require("./buysc.js");

router.post('/buysc' , buysc);

router.

module.exports = router;