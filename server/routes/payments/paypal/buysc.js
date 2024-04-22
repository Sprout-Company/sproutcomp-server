const config = require("../../../../config.js");
const mongoose = require("mongoose");
const paypalConfig = require(config.SERVER_DIR + "/engine/payments/paypal/config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");
const Transactions = require(config.DB_DIR + "/models/Transactions.js");
const { createOrder } = require(config.SERVER_DIR + "/engine/payments/paypal/invoice.js");

const buysc = async (req, res) => {
    const data = req.body;
    if (!data.id && (!req.session || !req.session || !req.session.user)) return res.status(404).json({ status: "ERROR", message: "USER_NOT_LOGGED" });
    let userId = data.id ? data.id : req.session.user;

    const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: new mongoose.Types.ObjectId(data.id) }] });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });
    userId = user._id;

    if (!data.source_amount) return res.status(404).json({ status: "ERROR", message: "DATA_NOT_FOUND" });
    try {
        // Llamar a la función para crear la factura
        const order = await createOrder(data.source_amount);
        if (order && order.status === 'CREATED') {
            const approvalUrl = order.links.find(link => link.rel === 'approve').href;

            const newTransaction = new Transactions({
                userId: user._id,
                transactionId: order.id,
                sproutcoins: data.source_amount / config.SC_USD_RATE,
                amount: amount,
                currency: "PAYPAL_USD",
                userEmail: user.email ? user.email : "admin@paypal1.com",
            });
            const wallet = await Wallet.findOne({ userId: user._id });
            wallet.topup_history.push(order.id);
            await wallet.save();

            if(data.id) return res.status(200).json({status: "SUCCESS" , message: approvalUrl});
            // Redirigir al usuario al enlace de aprobación
            res.redirect(approvalUrl);
        }
    } catch (error) {
        console.error('Error al crear la factura:', error);
        res.status(500).json({ status: 'ERROR', message: 'INTERNAL_SERVER_ERROR' });
    }

};

module.exports = buysc;