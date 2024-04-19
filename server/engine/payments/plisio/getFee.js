const https = require("https");
const config = require("./config.js");

const getFee = async (currency, amount, walletAddress , type , priority) => {
    try {
        const api_key = config.apiKey;
        const feePlan = priority ? priority : "priority";
        const type = type ? type : "cash_out";

        // Llama al endpoint get_commission para obtener la comisión y la tarifa de la criptomoneda
        const requestData = new URLSearchParams({
            addresses: walletAddress,
            amounts: amount,
            type,
            feePlan,
            api_key
        });

        const options = {
            hostname: "api.plisio.net",
            port: 443,
            path: `/api/v1/operations/commission/${currency}?${requestData}`,
            method: "GET"
        };

        const response = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });

        // Suma la comisión de Plisio y la tarifa de la criptomoneda para obtener el fee total
        const totalFee = parseFloat(response.data.commission) + parseFloat(response.data.fee);
        return totalFee;
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error("Failed to calculate fee");
    }
};

module.exports = getFee;
