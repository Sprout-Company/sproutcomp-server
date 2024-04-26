const udata = require("./udata.js");
const sproutCoins = require("./sproutCoins.js");
const balance = require("./balance.js");
const config_wallet = require("./config_wallet.js");
const lang = require("./lang.js");

const v1 = async (req, res, next) => {
  try {
    // Acceder a los datos enviados en el cuerpo de la solicitud POST
    const data = req.body;
    // Obtener la IP del cliente
    const clientIP = req.ip;

    if (data.type) {
      switch (data.type) {
        case "udata":
          udata(res, data);
          break;
        case "sproutCoins":
          sproutCoins(res, data);
          break;
        case "balance":
          balance(res, data);
          break;
        case "config_wallet":
          config_wallet(res, data);
          break;
        case "lang":
          lang(res , data);
          break;
        default:
          res.status(200).json({ status: 'ERROR', message: 'NO_DATATYPE_FOUND' });
      }
    } else res.status(200).json({ status: 'ERROR', message: 'NO_DATATYPE' });
  } catch (error) {
    // Manejar cualquier error que ocurra
    console.error('Error:', error);
    res.status(500).json({ status: 'ERROR', message: 'NO_VALID_DATA' });
  }
}

module.exports = v1;