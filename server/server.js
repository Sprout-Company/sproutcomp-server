// Modules imports
const config = require("../config.js");
const express = require("express");
const session = require("express-session");
const app = express();
const server = require("http").Server(app);
const passport = require("passport");
const router = require("./routes/router.js");
const User = require("./DB/models/User.js"); 
const MongoStore = require("connect-mongo");

//Google Middleware
require("./middlewares/google.js");
//Facebook Middleware
require("./middlewares/facebook.js");
//Local Middleware
require("./middlewares/login.js");

// Global middlewares
app.use(express.json());

const db = require("./DB/connection.js"); //mongodb connection

// Session Store utilizando Mongoose
const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: config.DB_SESSIONS_URI,
    dbName: "sessions" 
  }),
  resave: true,
  saveUninitialized: false,
  secret: 'SECRET_cOOKIE',
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 semana
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Serialize-Deserialize Users
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    const user = await User.findOne({ _id: id });
    done(null, user);
});

//Enrutamiento
app.use(router);


// Serve website routes
app.use(express.static(config.CLIENT_DIR));
app.get("*", (req, res) => {
  res.sendFile(config.CLIENT_DIR + "/index.html");
});


//socketing
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        method: ["POST", "GET"]
    }
})
io.use(function (socket, next) {
    // Wrap the express middleware
    sessionMiddleware(socket.request, {}, next);
});



// Iniciar el servidor y escuchar en el puerto especificado
server.listen(config.PORT, () => {
    console.log("Running in port " + config.PORT);
});
