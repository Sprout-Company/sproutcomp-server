const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const config = require("../../config.js");
const User = require(config.DB_DIR + "/models/User.js");

passport.use("local", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req, email, password, done) => {
        try {
            if (req.body.repassword) {
                // Registro de un nuevo usuario
                let user = await User.findOne({ email });

                if (user) {
                    // Si el usuario ya existe, devolver un mensaje de error
                    return done(null, false, { message: "El correo electrónico ya está en uso" });
                }

                if (password !== req.body.repassword) {
                    // Si las contraseñas no coinciden, devolver un mensaje de error
                    return done(null, false, { message: "Las contraseñas no coinciden" });
                }

                // Encriptar la contraseña antes de guardarla
                const hashedPassword = await bcrypt.hash(password, 10);

                // Generar un nombre de usuario aleatorio
                const randomUsername = "user_" + Math.floor(Math.random() * 90000000 + 10000000);

                // Crear un nuevo usuario
                user = new User({
                    email,
                    username: randomUsername,
                    password: hashedPassword,
                });
                await user.save();

                // Autenticar al nuevo usuario
                return done(null, user);
            } else {
                // Autenticar al usuario existente por correo electrónico
                let user = await User.findOne({ email });

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
