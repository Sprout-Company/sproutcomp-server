const Transactions = require('../../DB/models/Transactions.js');

// Función para limpiar transacciones no pagadas después de una hora
const cleanUnpaidTransactions = async () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // Hace una hora
    try {
        // Buscar transacciones no pagadas creadas hace más de una hora
        const unpaidTransactions = await Transactions.find({
            createdAt: { $lt: oneHourAgo },
            paid: false
        });

        // Eliminar las transacciones no pagadas encontradas
        await Promise.all(unpaidTransactions.map(async (transaction) => {
            await Transactions.findByIdAndDelete(transaction._id);
            console.log(`Transacción no pagada eliminada: ${transaction._id}`);
        }));
    } catch (error) {
        console.error('Error al limpiar transacciones no pagadas:', error);
    }
};

// Ejecutar la limpieza periódicamente (cada 5 minuto)
setInterval(cleanUnpaidTransactions, 5 * 60 * 1000);

module.exports = cleanUnpaidTransactions;