const config = require("../../../../config.js");
const mongoose = require("mongoose");
const User = require(config.DB_DIR + "/models/User.js");


module.exports = async (res, data) => {
  if (!data.id) return res.status(200).json({ status: 'ERROR', message: 'ID_NOT_FOUND' });
  if (!data.lang) return res.status(200).json({ status: 'ERROR', message: 'LANG_NOT_FOUND' });

  try {
    const user = await User.findOne({ $or: [{ telegram_id: data.id }, { _id: new mongoose.Types.ObjectId(data.id) }] });
    if (!user) return res.status(200).json({ status: 'ERROR', message: 'USER_NOT_FOUND' });

    if(!config.LANGS.includes(data.lang)) return res.status(200).json({ status: 'ERROR', message: 'UNKNOWN_LANG' });

    user.lang = data.lang;
    await user.save();

    return res.status(200).json({
      status: 'SUCCESS',
      message: {
        user: {
          lang: user.lang
        }
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ status: 'ERROR', message: 'INTERNAL_SERVER_ERROR' });
  }
}