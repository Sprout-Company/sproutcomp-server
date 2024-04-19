const https = require("https");
const config = require("../../../engine/payments/plisio/config.js");
const getExchangeRate = require(config.DIR + "/getExchangeRate.js");
const User = require("../../../DB/models/User.js");
const Wallet = require("../../../DB/models/Wallet.js");

// Función para manejar las solicitudes de retiro
const withdraw = async (req, res) => {
    try {
        const data = req.body;
        // Verificar si se proporciona un ID de usuario o si el usuario está autenticado
        if (!data.id && (!req.session || !req.session.user)) {
            return res.status(404).json({ status: "ERROR", message: "USER_NOT_LOGGED" });
        }
        let userId = data.id ? data.id : req.session.user;

        // Encontrar al usuario en la base de datos
        const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: new mongoose.Types.ObjectId(data.id) }] });
        if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });
        userId = user._id;
        // Datos requeridos para la solicitud de retiro
        const { currency, amount } = req.body;
        const type = "cash_out";
        const api_key = config.apiKey;
        
        // Verificar si todos los campos requeridos están presentes
        if (!currency || !amount) {
            return res.status(400).json({ status: "ERROR", message: "DATA_NOT_FOUND" });
        }

        // Obtener la tasa de cambio de USD a la criptomoneda específica
        const exchangeRate = await getExchangeRate(currency);
        
        // Convertir la cantidad de retiro de USD a la criptomoneda específica
        const amountInCrypto = amount / exchangeRate;


        // Obtener los datos de la billetera del usuario
        const wallet = await Wallet.findOne({ userId });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ status: "ERROR", message: "INSUFFICIENT_BALANCE" });
        }

        if(!wallet.wallets[currency]) return res.status(400).json({ status: "ERROR", message: "WALLETADDRESS_NOT_FOUND" });

        // Construir los datos para la solicitud
        const requestData = new URLSearchParams({
            currency,
            type,
            to: wallet.wallets[currency],
            amount: amountInCrypto,
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
        const reqPlisio = https.request(options, async (resPlisio) => {
            let responseData = "";

            // Recibir datos de la respuesta
            resPlisio.on("data", (chunk) => {
                responseData += chunk;
            });

            // Finalizar la recepción de datos y procesar la respuesta
            resPlisio.on("end", async () => {
                // Actualizar el saldo de la billetera del usuario
                if (resPlisio.statusCode === 201) {
                    const userData = await User.findById(userId);
                    const wallet = await Wallet.findOne({ userId });
                    
                    // Verificar si se encontró el usuario y la billetera
                    if (userData && wallet) {
                        // Actualizar el saldo de la billetera
                        wallet.balance -= amount;
                        await wallet.save();
                        
                        // Enviar la respuesta al cliente
                        res.status(resPlisio.statusCode).json(JSON.parse(responseData));
                    } else {
                        res.status(404).json({ status: "ERROR", message: "USER_OR_WALLET_NOT_FOUND" });
                    }
                } else {
                    res.status(resPlisio.statusCode).json(JSON.parse(responseData));
                }
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

module.exports = withdraw;
