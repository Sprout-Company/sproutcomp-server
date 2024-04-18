const https = require("https");
const config = require("./config.js");
const User = require("../../../DB/models/User.js");
const Wallet = require("../../../DB/models/Wallet.js");


// Función para manejar las solicitudes de retiro
const withdrawal = async (req, res) => {
    try {
        // Datos requeridos para la solicitud de retiro
        const { currency, amount } = req.body;
        const type = "cash_out";
        const api_key = config.apiKey;
        // Verificar si todos los campos requeridos están presentes
        if (!currency ||  !amount ) {
            return res.status(400).json({ status: "ERROR", message: "DATA_NOT_FOUND" });
        }

        // Construir los datos para la solicitud
        const requestData = new URLSearchParams({
            currency,
            type,
            to,
            amount,
            api_key
        });

        // Opciones para la solicitud HTTPS
        const options = {
            hostname: "api.plisio.net",
            port: 443,
            path: `/api/v1/operations/withdraw?${requestData}`,
            method: "GET"
        };

        // Realizar la solicitud HTTPS
        const reqPlisio = https.request(options, (resPlisio) => {
            let responseData = "";

            // Recibir datos de la respuesta
            resPlisio.on("data", (chunk) => {
                responseData += chunk;
            });

            // Finalizar la recepción de datos y enviar la respuesta al cliente
            resPlisio.on("end", () => {
                res.status(resPlisio.statusCode).json(JSON.parse(responseData));
            });
        });

        // Manejar errores de la solicitud
        reqPlisio.on("error", (error) => {
            console.error("Error:", error.message);
            res.status(500).json({ status: "error", message: "INTERNAL_SERVER_ERROR" });
        });

        // Enviar los datos de la solicitud
        reqPlisio.end();
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error("Error:", error.message);
        res.status(500).json({ status: "ERROR", message: "INTERNAL_SERVER_ERROR" });
    }
};

module.exports = withdrawal;
