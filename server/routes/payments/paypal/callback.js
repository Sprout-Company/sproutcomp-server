const config = require("../../../../config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");
const Transactions = require(config.DB_DIR + "/models/Transactions.js");

const callback = async (req, res) => {
    let data = req.body;

    if (data) {
        try {
            if (data.status == "success") {}
            // Buscar la transacción por su ID en la base de datos
            const trans = await Transactions.findOne({ transactionId: data.id });

            if (!trans) {
                return res.status(404).json({ status: 'ERROR', message: 'TRANSACTION_NOT_FOUND' });
            }

            // Actualizar el estado de la transacción
            trans.status = data.status;
            if (data.status == "completed" && trans.processed == false) {
                trans.processed = true;
                const wallet = await Wallet.findOne({ userId: trans.userId });
                if (!wallet) return res.status(404).json({ status: 'ERROR', message: 'WALLET_NOT_FOUND' });
                wallet.sprout_coins += trans.sproutcoins;
                await wallet.save();
            }
            await trans.save();

            res.status(200).json({ status: 'SUCCESS', message: 'PAYMENT_DONE' });
        } catch (error) {
            console.error('Error al actualizar la transacción:', error);
            res.status(500).json({ status: 'ERROR', message: 'INTERNAL_SERVER_ERROR' });
        }
    } else {
        return res.status(404).json({ status: "ERROR", message: "WRONG_DATA" });
    }
};

module.exports = callback;