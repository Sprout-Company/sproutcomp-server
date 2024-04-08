const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true  },
    telegram_id: { type: String, unique: true },
    google_id: { type: String, unique: true },
    facebook_id: { type: String, unique: true },
    referredBy: { type: String},
    referrals: {type: Object}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
