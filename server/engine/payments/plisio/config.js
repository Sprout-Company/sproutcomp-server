const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    acceptedCurrencies: ["TRX"],
    apiKey: process.env.PLISIO_KEY,
    host: "api.plisio.net"
};