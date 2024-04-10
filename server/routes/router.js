
const config = require("../../config.js");
const express = require("express");
const router = express.Router();

const auth = require("./auth/router.js");

router.use("/auth" , auth);

// Serve website routes
router.use(express.static(config.CLIENT_DIR));
router.use((req, res) => {
  res.sendFile(config.CLIENT_DIR + "/index.html");
  res.end();
});

module.exports = router;