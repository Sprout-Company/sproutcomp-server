
const config = require("../../config.js");
const express = require("express");
const router = express.Router();

const auth = require("./auth/router.js");

router.use("/auth" , auth);

module.exports = router;