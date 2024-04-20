const configWallet = require("../../../engine/payments/configWallet.js");
const User = require("../../../DB/models/User.js");
const config_wallet = async (res , data) => {
    if(!data.method || !data.address) return res.status(200).json({ status: 'ERROR', message: 'DATA_NOT_FOUND' });
    if(!data.id) return res.status(404).json({ status: "ERROR" , message: "USER_NOT_LOGGED" });
    let userId = data.id;

    const user = await User.findOne({ telegram_id: data.id });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });
    userId = user._id;

    const conf = await configWallet(userId , data.method , data.address);

    return res.status(200).json(conf);
}

module.exports = config_wallet;