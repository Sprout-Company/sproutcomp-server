const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js"); 

passport.use("facebook", new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: config.URL + "/auth/facebook/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      // Buscar un usuario existente por facebook_id
      let user = await User.findOne({ facebook_id: profile.id });

      if (!user) {
        // Si el usuario no existe, crear uno nuevo
        user = new User({
          username: profile.username || profile.displayName,
          facebook_id: profile.id
        });
        await user.save();
      }

      // Llamar a la función de retorno de llamada con el usuario
      cb(null, user);
    } catch (err) {
      // Si hay un error, pasar el error a la función de retorno de llamada
      cb(err);
    }
  }
));
