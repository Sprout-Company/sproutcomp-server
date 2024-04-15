const onLogin = require("./onLogin.js");

const Socket = (io) => {
    io.on("connect", async (socket) => {
        if (!socket.request.session ||
            !socket.request.session.passport ||
            !socket.request.session.passport.user) {
            socket.emit("ERROR", "AUTH_ERROR");
            return socket.disconnect();
        }
        socket.user_id = socket.request.session.passport.user;
        onLogin(socket, () => {
            
        });
    });
};

module.exports = Socket;