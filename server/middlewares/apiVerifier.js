// Objeto que mapea los nombres de los bots a sus tokens
const botTokens = {
    sproutbingo: '02hnm2394Sisdi249Doiw1sjDiDKMowWJ293J9sk'
};
// Middleware para verificar el token de autenticación en las solicitudes entrantes
const verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({status: 'ERROR' , message: 'TOKEN_NOT_FOUND' });
    }

    // Verificar si el token enviado coincide con alguno de los tokens de los bots
    let tokenValid = false;
    for (const bot in botTokens) {
        if (botTokens.hasOwnProperty(bot) && botTokens[bot] === authToken) {
            tokenValid = true;
            break;
        }
    }

    if (tokenValid) {
        // Si el token es válido, continuar con la solicitud
        next();
    } else {
        return res.status(401).json({status : "ERROR" , message: 'INVALID_TOKEN' });
    }
};

module.export = verifyToken;