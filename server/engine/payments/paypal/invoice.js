const paypal = require('paypal-rest-sdk');
const config = require('./config.js'); // Archivo de configuración con tus credenciales de PayPal
const {SC_USD_RATE} = require('../../../../config.js');

paypal.configure({
    mode: config.mode,
    client_id: config.client_id,
    client_secret: config.client_secret
});

// Función para crear una orden de pago
const createOrder = async (amount) => {
    const create_order_json = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: config.default_fiat_currency,
                value: amount
            },
            description: `Buy x${amount / SC_USD_RATE} SproutCoins.`
        }],
        application_context: {
            return_url: config.returnUrl,
            cancel_url: config.cancelUrl
        }
    };

    try {
        const order = await paypal.orders.create(create_order_json);
        return order;
    } catch (error) {
        console.error('Error al crear la orden de pago de PayPal:', error);
        throw error;
    }
};

// Función para capturar el pago de PayPal
const capturePayment = async (orderId) => {
    try {
        const capture = await paypal.orders.capture(orderId);
        return capture;
    } catch (error) {
        console.error('Error al capturar el pago de PayPal:', error);
        throw error;
    }
};

module.exports = {
    createOrder,
    capturePayment
};