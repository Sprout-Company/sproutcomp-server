const dotenv = require("dotenv");
dotenv.config();
const config = require("../../../../config.js");

const mode = "sandbox";//"live" en produccion

module.exports = {
    default_fiat_currency: "USD",
    DIR: __dirname,
    mode: mode , 
    client_id: mode == "sandbox" ? process.env.PAYPAL_SANDBOX_API_KEY : process.env.PAYPAL_API_KEY,
    client_secret: mode == "sandbox" ? process.env.PAYPAL_SANDBOX_API_SECRET : process.env.PAYPAL_API_SECRET
};