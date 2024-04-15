const https = require('https');
const config = require("./config.js");

const createInvoice = (invoiceData) => {
    invoiceData.api_key = config.apiKey;
    invoiceData.callback_url = config.callback_url;
    
    return new Promise((resolve, reject) => {
        // Parámetros de la solicitud GET
        const queryParams = new URLSearchParams(invoiceData).toString();

        // Opciones para la solicitud HTTPS
        const options = {
            hostname: config.host,
            port: 443,
            path: `/api/v1/invoices/new?${queryParams}`,
            method: 'GET',
        };

        // Realizar la solicitud HTTPS
        const req = https.request(options, (res) => {
            let data = '';

            // Recibir datos de la respuesta
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Al completar la respuesta
            res.on('end', () => {
                try {
                    const responseData = JSON.parse(data);
                    resolve(responseData);
                } catch (error) {
                    reject(error);
                }
            });
        });

        // Manejar errores de la solicitud
        req.on('error', (error) => {
            reject(error);
        });

        // Finalizar la solicitud
        req.end();
    });
};

module.exports = createInvoice;

// Ejemplo de uso:
/*
const invoiceData = {
    source_currency: 'USD',
    source_amount: 2,
    order_number: 1,
    currency: 'BTC',
    email: 'customer@plisio.net',
    order_name: 'btc1',
    callback_url: 'http://test.com/callback'
};

createInvoice(invoiceData)
    .then((response) => {
        console.log('Respuesta de la API:', response);
    })
    .catch((error) => {
        console.error('Error al crear la factura:', error);
    });*/