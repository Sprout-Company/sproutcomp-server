const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js"); 

passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: config.URL + "/auth/google/callback",
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      // Buscar un usuario existente por google_id
      let user = await User.findOne({ google_id: profile.id });

      if (!user) {
        // Si el usuario no existe, crear uno nuevo
        user = new User({
          username: profile.displayName || profile.given_name,
          google_id: profile.id
        });
        await user.save();
      }

      // Llamar a la función de retorno de llamada con el usuario
      done(null, user);
    } catch (err) {
      // Si hay un error, pasar el error a la función de retorno de llamada
      done(err);
    }
  }
));
