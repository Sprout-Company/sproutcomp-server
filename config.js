//Config General
const dotenv = require("dotenv");
dotenv.config();

const config = {
  
    // directories
    DIR: __dirname,
    SERVER_DIR: __dirname + "/server",
    DB_DIR: __dirname + "/server/DB",
    CLIENT_DIR: __dirname + "/client/dist",
    
    // uri
    HOST: "www.sproutcomp.pro",
    URL: "https://www.sproutcomp.pro",
    DB_URI: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST_1}/${process.env.MONGODB_NAME}`,
    DB_SESSIONS_URI: `mongodb+srv://sproutcompadmin:${process.env.MONGODB_PASS}@sproutcomprespald.0dazklo.mongodb.net/?retryWrites=true&w=majority&appName=SproutCompRespald`,
    
    PORT: process.env.PORT || 3000,
    CLIENT_PORT: 3001,
};

module.exports = config;