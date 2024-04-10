const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true },
    password: { type: String },
    email: { type: String, unique: true, sparse: true },
    telegram_id: { type: String, unique: true, sparse: true },
    google_id: { type: String, unique: true, sparse: true },
    facebook_id: { type: String, unique: true, sparse: true },
    referredBy: { type: String },
    referrals: { type: Object }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
