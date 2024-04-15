const dotenv = require("dotenv");
dotenv.config();
const config = require("../../../../config.js");

module.exports = {
    acceptedCurrencies: ["TRX"],
    default_fiat_currency: "USD",
    DIR: __dirname,
    apiKey: process.env.PLISIO_KEY,
    host: "api.plisio.net",
    callback_url: config.URL + "/payments/crypto/callback?json=true"
};