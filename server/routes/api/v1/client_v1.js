const https = require('https');

let host = 'localhost' , authToken = 'auth_token'; // Host por defecto

const client_v1 = {};

client_v1.setAuthToken = (token) => {
    authToken = token;
};

client_v1.hostConfig = (newHost) => {
    host = newHost;
};

const makeRequest = (data) => {
    return new Promise((resolve, reject) => {
        const requestData = JSON.stringify(data);
        const options = {
            hostname: host,
            port: 443, // Puerto HTTPS
            path: '/api/v1',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': requestData.length,
                'Authorization': `Bearer ${authToken}`
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve(responseData);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(requestData);
        req.end();
    });
};

client_v1.getUserData = async (id) => {
    const data = { type: 'udata', id: parseInt(id) };
    const response = await makeRequest(data);
    return JSON.parse(response);
};

client_v1.sproutCoins = async (id, sproutcoins) => {
    const data = { type: 'sproutCoins', id: parseInt(id), sproutcoins: sproutcoins };
    const response = await makeRequest(data);
    return JSON.parse(response);
};

client_v1.balance = async (id, balance) => {
    const data = { type: 'balance', id: parseInt(id), balance: balance }; 
    const response = await makeRequest(data);
    return JSON.parse(response);
};

module.exports = client_v1;