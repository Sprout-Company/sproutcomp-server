const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: config.URL + "/auth/google/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Buscar un usuario existente por google_id
      let user = await User.findOne({ google_id: { $ne: null, $exists: true, $eq: profile.id } });

      if (!user) {
        // Si el usuario no existe, crear uno nuevo
        user = new User({
          username: profile.displayName || profile.given_name,
          google_id: profile.id,
          email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null
        });
        // Verificar si hay un ID de referido almacenado en la sesión del usuario
        if (req.session && req.session.referralId) {
          user.referredBy = req.session.referralId;
        }

        if (req.session && req.session.telegramId) {
          user.telegram_id = req.session.telegramId;
        }

        await user.save();

        if (user) {
          let wallet = new Wallet({
            userId: user._id
          });

          await wallet.save();
        }
      }

      // Llamar a la función de retorno de llamada con el usuario
      done(null, user);
    } catch (err) {
      // Si hay un error, pasar el error a la función de retorno de llamada
      done(err);
    }
  }
));