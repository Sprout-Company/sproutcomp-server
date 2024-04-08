const mongoose = require('mongoose');
const dotenv = require("dotenv");
const config = require("../../config.js");
dotenv.config();

// URL de conexión de MongoDB
const dbURI = config.DB_URI;

// Configuración de la conexión
const options = {
};

// Establecer la conexión a la base de datos
mongoose.connect(dbURI, options)
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = {};