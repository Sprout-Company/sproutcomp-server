const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js");
const Wallet = require(config.DB_DIR + "/models/Wallet.js");

passport.use("facebook", new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: config.URL + "/auth/facebook/callback",
  passReqToCallback: true,
  profileFields: ['id', 'displayName', 'emails'], 
  scope: ['email']
},
  async (req , accessToken, refreshToken, profile, cb) => {
    try {
      // Buscar un usuario existente por facebook_id
      let user = await User.findOne({ facebook_id: { $ne: null, $exists: true, $eq: profile.id } });

      if (!user) {
        // Si el usuario no existe, crear uno nuevo
        user = new User({
          username: profile.username || profile.displayName,
          facebook_id: profile.id,
          email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null
        });

        // Verificar si hay un ID de referido almacenado en la sesión del usuario
        if (req.session && req.session.referralId) {
          user.referredBy = req.session.referralId;
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
      cb(null, user);
    } catch (err) {
      // Si hay un error, pasar el error a la función de retorno de llamada
      cb(err);
    }
  }
));
