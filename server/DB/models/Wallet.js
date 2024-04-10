const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al _id del usuario
    sprout_coins: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    payments_history: { type: Object , default: []}
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;