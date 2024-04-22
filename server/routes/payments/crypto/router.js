const router = require("express").Router();
const buysc = require("./buysc.js");
const exchangeRate = require("./exchangeRate.js");
const withdraw = require("./withdraw.js");
const callback = require("./callback.js");

router.post('/buysc' , buysc);

router.post('/exchange_rate' , exchangeRate);

router.post('/withdraw' , withdraw);

router.post('/callback', callback);

module.exports = router;