const config = require("../../../../config.js");
const plisioConfig = require(config.SERVER_DIR + "/engine/payments/plisio/config.js");
const getExchangeRate = require(plisioConfig.DIR + "/getExchangeRate.js");

const exchangeRate = async (req , res) => {
    const data = req.body;
    if(!data.currency) return res.status(400).json({status: "ERROR" , message: "DATA_NOT_FOUND"});
    const rate = await getExchangeRate(data.currency);
    if(!rate) return res.status(400).json({status: "ERROR" , message: "CURRENCY_NOT_FOUND"});
    return res.status(200).json({status: "SUCCESS" , message: {currency: data.currency , to: "USD" , rate}}); 
};

module.exports = exchangeRate;