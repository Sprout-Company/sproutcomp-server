const configWallet = require("../../../engine/payments/configWallet.js");
const User = require("../../../DB/models/User.js");
const config_wallet = async (req , res ) => {
    const data = req.body;
    if(!data.method || !data.address) return res.status(200).json({ status: 'ERROR', message: 'DATA_NOT_FOUND' });
    if(!data.id && (!req.session || !req.session || !req.session.user)) return res.status(404).json({ status: "ERROR" , message: "USER_NOT_LOGGED" });
    let userId = data.id ? data.id : req.session.user;

    const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: new mongoose.Types.ObjectId(data.id) }] });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });
    userId = user._id;

    const conf = await configWallet(userId , method , address);

    return res.status(200).json(conf);
}

module.exports = config_wallet;