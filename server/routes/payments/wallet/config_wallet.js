const configWallet = require("../../../engine/payments/configWallet.js");
const User = require("../../../DB/models/User.js");
const config_wallet = async (req , res ) => {
    const data = req.body;
    if(!data.method || !data.address) return res.status(200).json({ status: 'ERROR', message: 'DATA_NOT_FOUND' });
    if(!req.session || !req.session || !req.session.user) return res.status(404).json({ status: "ERROR" , message: "USER_NOT_LOGGED" });
    let userId = req.session.user;

    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });
    userId = user._id;

    const conf = await configWallet(userId , data.method , data.address);

    return res.status(200).json(conf);
}

module.exports = config_wallet;