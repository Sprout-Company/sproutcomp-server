const Wallet = require('../../DB/models/Wallet.js');

// Función para guardar una dirección para una criptomoneda en el objeto wallets
const configWallet = async (userId, method, address) => {
    try {

        // Buscar la billetera del usuario por su ID
        const wallet = await Wallet.findOne({ userId });

        // Si no se encuentra la billetera
        if (!wallet) {
            const newWallet = new Wallet({ userId, wallets: { [method]: address } });
            await newWallet.save();
        }

        // Actualizar o agregar la dirección de la criptomoneda en el objeto wallets
        wallet.wallets[method] = address;

        // Guardar los cambios en la base de datos
        await wallet.save();

        return { status: 'SUCCESS', message: 'WALLET_ADDRESS_SAVED' };
    } catch (error) {
        console.error('Error al guardar la dirección de la billetera:', error);
        return { status: 'ERROR', message: 'INTERNAL_SERVER_ERROR' };
    }
};

module.exports = configWallet;
