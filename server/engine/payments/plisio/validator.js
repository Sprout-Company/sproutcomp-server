const config = require("./config.js");
const crypto = require('crypto');

module.exports = (data) => {
    if (typeof data === 'object' && data.verify_hash && config.apiKey) {
        const ordered = { ...data };
        delete ordered.verify_hash;
        const string = JSON.stringify(ordered);
        const hmac = crypto.createHmac('sha1', config.apiKey);
        hmac.update(string);
        const hash = hmac.digest('hex');
        return hash === data.verify_hash;
    }
    return false;
}