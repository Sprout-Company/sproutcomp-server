const https = require("https");
const config = require("./config.js");

// Función para obtener la tasa de cambio de una criptomoneda con respecto al dólar estadounidense (USD)
const getExchangeRate = (currency) => {
    return new Promise((resolve, reject) => {
        // Construir los datos para la solicitud
        const requestData = new URLSearchParams({
            api_key: config.apiKey
        });

        // Opciones para la solicitud HTTPS
        const options = {
            hostname: "api.plisio.net",
            port: 443,
            path: `/api/v1/currencies?${requestData}`,
            method: "GET"
        };

        // Realizar la solicitud HTTPS
        const reqPlisio = https.request(options, (resPlisio) => {
            let responseData = "";

            // Recibir datos de la respuesta
            resPlisio.on("data", (chunk) => {
                responseData += chunk;
            });

            // Finalizar la recepción de datos y resolver la promesa con la tasa de cambio
            resPlisio.on("end", () => {
                if (resPlisio.statusCode === 200) {
                    const cryptocurrencies = JSON.parse(responseData).data;
                    // Buscar la criptomoneda específica
                    const cryptoCurrency = cryptocurrencies.find(crypto => crypto.currency === currency);
                    if (cryptoCurrency) {
                        resolve(cryptoCurrency.rate_usd);
                    } else {
                        reject(new Error(`Cryptocurrency '${currency}' not found`));
                    }
                } else {
                    reject(new Error(`Error: ${resPlisio.statusCode}`));
                }
            });
        });

        // Manejar errores de la solicitud
        reqPlisio.on("error", (error) => {
            console.error("Error:", error.message);
            reject(error);
        });

        // Enviar los datos de la solicitud
        reqPlisio.end();
    });
};

module.exports = getExchangeRate;
