const Socket = (io) => {
    io.on("connect" , async (socket) => {
        if (!socket.request.session || 
            !socket.request.session.passport || 
            !socket.request.session.passport.user) {
                socket.emit("ERROR" , "AUTH_ERROR");
            }
        socket.emit("AUTH" , "LOGGED");
    });
};

module.exports = Socket;