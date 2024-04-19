const config = require("../../../../config.js");
const plisioConfig = require(config.SERVER_DIR + "/engine/payments/plisio/config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");
const Transactions = require(config.DB_DIR + "/models/Transactions.js");
const createInvoice = require(config.SERVER_DIR + "/engine/payments/plisio/createInvoice.js");

const buysc = async (req , res) => {
    const data = req.body;
    if(!data.id && (!req.session || !req.session || !req.session.user)) return res.status(404).json({ status: "ERROR" , message: "USER_NOT_LOGGED" });
    let userId = data.id ? data.id : req.session.user;

    const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: new mongoose.Types.ObjectId(data.id) }] });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });
    userId = user._id;
    
    if(!data.source_amount||
    !data.currency) return res.status(404).json({ status: "ERROR" , message: "DATA_NOT_FOUND" });
    
    if(!plisioConfig.acceptedCurrencies.includes(data.currency)) return res.status(404).json({ status: "ERROR" , message: "UNSUPPORTED_CURRENCY" });
    
    const count = await Transactions.countDocuments({});

    let invoiceData = {
        source_currency: plisioConfig.default_fiat_currency,
        source_amount: data.source_amount,
        order_number: count + 1,
        currency: data.currency,
        email: user.email ? user.email : 'customer@plisio.net',
        order_name: 'Buy SproutCoins x' + data.source_amount * 100
    };
    try {
        // Llamar a la función para crear la factura
        const response = await createInvoice(invoiceData);
        const _data =  response.data;
        const params = response.data.params
        const newTransaction = new Transactions({
            userId: user._id,
            transactionId: _data.txn_id,
            sproutcoins: data.source_amount * 100,
            amount: params.amount,
            currency: params.currency,
            userEmail: params.userEmail,
        });
        const wallet = await Wallet.findOne({userId : user._id});
        wallet.topup_history.push(_data.trx_id);
        await wallet.save();
        res.status(200).json(response); // Devolver la respuesta de la API de Plisio
    } catch (error) {
        console.error('Error al crear la factura:', error);
        res.status(500).json({ status: 'ERROR', message: 'INTERNAL_SERVER_ERROR' });
    }
};

module.exports = buysc;