const config = require("../../../../config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

module.exports = async (res , data) => {
    if(!data.id) return res.status(200).json({status: 'ERROR' , message: 'ID_NOT_FOUND' });
    const user = await User.findOne({ $or: [{ telegram_id: id }, { _id: id }] });
    if(!user) return res.status(200).json({status: 'ERROR' , message: 'USER_NOT_FOUND' });

    const wallet = await Wallet.findOne({userId: _id});
    return res.status(200).json({status: 'SUCCESS' , message: {user: {
        username: user.username , lang: user.lang , referrals: user.referrals}, wallet} });
}