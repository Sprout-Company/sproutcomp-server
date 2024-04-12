const user_data = require("./user_data.js");

const v1 = async (req, res, next) => {
    try {
        // Acceder a los datos enviados en el cuerpo de la solicitud POST
        const data = req.body;
        // Obtener la IP del cliente
        const clientIP = req.ip;

        if(data.type) switch(data.type){
            case "user_data":
                user_data(res , data);
                break;
            case "sproutCoins":
                sproutCoins(res , data);
                break;
            default:
                res.status(200).json({status: 'ERROR' , message: 'NO_DATATYPE_FOUND' });
        }

        res.status(200).json({status: 'ERROR' , message: 'NO_DATATYPE' });
    } catch (error) {
        // Manejar cualquier error que ocurra
        console.error('Error:', error);
        res.status(500).json({status: 'ERROR' , message: 'NO_VALID_DATA' });
    }
}

module.exports = v1;