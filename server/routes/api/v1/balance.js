const config = require("../../../../config.js");
const mongoose = require("mongoose");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

module.exports = async (res, data) => {
  if (!data.id) return res.status(200).json({ status: 'ERROR', message: 'ID_NOT_FOUND' });
  if (!data.sproutcoins || !data.balance) return res.status(200).json({ status: 'ERROR', message: 'DATA_NOT_FOUND' });

  try {
    const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: mongoose.Types.ObjectId(data.id) }] });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });

    const wallet = await Wallet.findOne({ userId: user._id });
    if (!wallet) return res.status(200).json({ status: 'ERROR', message: 'WALLET_NOT_FOUND' });

    if (wallet.balance + data.balance < 0) {
      return res.status(200).json({ status: 'ERROR', message: 'NOT_ENOUGH_BALANCE' });
    }

    wallet.balance += data.balance;
    await wallet.save();

    return res.status(200).json({ status: 'SUCCESS', message: { wallet } });
  } catch (error) {
    console.error('Error processing sproutCoins:', error);
    return res.status(500).json({ status: 'ERROR', message: 'INTERNAL_SERVER_ERROR' });
  }
}