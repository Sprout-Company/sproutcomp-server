const config = require("../../../../config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

module.exports = async (res, data) => {
  if (!data.id) return res.status(200).json({ status: 'ERROR', message: 'ID_NOT_FOUND' });

  try {
    const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: data.id }] });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });

    const wallet = await Wallet.findOne({ userId: user._id });
    if (!wallet) return res.status(200).json({ status: 'ERROR', message: 'WALLET_NOT_FOUND' });

    return res.status(200).json({
      status: 'SUCCESS',
      message: {
        user: {
          username: user.username,
          lang: user.lang,
          referrals: user.referrals
        },
        wallet
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ status: 'ERROR', message: 'INTERNAL_SERVER_ERROR' });
  }
}