const config = require("../../../../config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

module.exports = async (res , data) => {
    if(!data.id) return res.status(200).json({status: 'ERROR' , message: 'ID_NOT_FOUND' });
    if(!data.sproutcoins) return res.status(200).json({status: 'ERROR' , message: 'DATA_NOT_FOUND' });
    const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: data.id }] });
    if(!user) return res.status(200).json({status: 'ERROR' , message: 'USER_NOT_FOUND' });

    const wallet = await Wallet.findOne({userId: _id});
    if(wallet.sprout_coins + data.sproutcoins < 0) return res.status(200).json({status: 'ERROR' , message: 'NOT_ENOUGHT_COINS' });
    wallet.sprout_coins += data.sproutcoins;
    
    await wallet.save();
    
    return res.status(200).json({status: 'SUCCESS' , message: {wallet} });
}