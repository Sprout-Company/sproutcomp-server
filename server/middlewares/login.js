const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js"); 

passport.use("local", new LocalStrategy(
  async (username, password, done) => {
    try {
      // Buscar un usuario por nombre de usuario en MongoDB
      let user = await User.findOne({ username });

      if (!user) {
        // Si el usuario no existe, crear uno nuevo
        user = new User({
          username,
          password, // NOTA: encriptarla
        });
        await user.save();
      } else {
        // Si el usuario existe, verificar la contraseña
        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
          // Contraseña incorrecta
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }

      // Autenticación exitosa, pasar el usuario a la función de retorno de llamada
      done(null, user);
    } catch (err) {
      // Si hay un error, pasar el error a la función de retorno de llamada
      done(err);
    }
  }
));
