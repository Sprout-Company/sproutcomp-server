const paypal = require('paypal-rest-sdk');
const config = require('./config'); // Archivo de configuración con tus credenciales de PayPal

paypal.configure({
    mode: config.paypal.mode,
    client_id: config.paypal.client_id,
    client_secret: config.paypal.client_secret
});

// Función para crear una orden de pago
const createOrder = async (amount, description) => {
    const create_order_json = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: config.default_fiat_currency,
                value: amount
            },
            description: description
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