const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

const onLogin = async (socket , callback) => {
    if (!data.id) return socket.emit('ERROR', 'ID_NOT_FOUND' );
    const user = await User.findOne({ _id: socket.user_id });
    if (!user) return socket.emit('ERROR', 'USER_NOT_FOUND');

    const wallet = await Wallet.findOne({ userId: socket.user_id });

    socket.emit("user_data", { user: {
        username : user.username,
        email: user.email,
        google: user.google_id ? true : false,
        facebook: user.facebook_id ? true : false,
        telegram: user.telegram_id ? true : false,
        referredBy: user.referredBy,
        referrals: user.referrals
    }, wallet } );

    callback(socket);
};

module.exports = onLogin;