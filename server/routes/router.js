
const config = require("../../config.js");
const express = require("express");
const router = express.Router();

const auth = require("./auth/router.js");
const api = require("./api/router.js");
const payments = require("./payments/router.js");

router.use("/auth" , auth);
router.use("/api" , api);
router.use("/payments" , payments);

module.exports = router;