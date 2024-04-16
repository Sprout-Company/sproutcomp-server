const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js");

passport.use("local", new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  async (req, username, password, done) => {
    try {
      // Verificar si se recibió un email y repassword para registro
      if (req.body.email && req.body.repassword) {
        // Registrar un nuevo usuario
        let user = await User.findOne({ username });

        if (user) {
          // Si el usuario ya existe, devolver un mensaje de error
          return done(null, false, { message: "El nombre de usuario ya está en uso" });
        }

        if (password !== req.body.repassword) {
          // Si las contraseñas no coinciden, devolver un mensaje de error
          return done(null, false, { message: "Las contraseñas no coinciden" });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        user = new User({
          username,
          password: hashedPassword,
          email: req.body.email
        });
        await user.save();

        // Autenticar al nuevo usuario
        return done(null, user);
      } else {
        // Autenticar al usuario existente
        let user = await User.findOne({ username });

        if (!user) {
          // Si el usuario no existe, devolver un mensaje de error
          return done(null, false, { message: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          // Si la contraseña es incorrecta, devolver un mensaje de error
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        // Autenticación exitosa, pasar el usuario a la función de retorno de llamada
        return done(null, user);
      }
    } catch (err) {
      // Si hay un error, pasar el error a la función de retorno de llamada
      return done(err);
    }
  }
));
