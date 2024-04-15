const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al id de usuario
    transactionId: { type: String, required: true }, // ID de la transacción proporcionado por Plisio
    sproutcoins: { type: Number, required: true }, // cantidad de sproutcoins compradas
    amount: { type: Number, required: true }, // Monto de la transacción
    currency: { type: String, required: true }, // Moneda utilizada para la transacción
    status: { type: String, default: 'pending' }, // Estado de la transacción (por defecto, pendiente)
    transactionDate: { type: Date, default: Date.now }, // Fecha y hora de la transacción
    userEmail: { type: String }, // Correo electrónico del usuario (opcional)
    processed: {type: Boolean, default: false}
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
