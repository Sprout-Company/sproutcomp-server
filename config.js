//Config General
const dotenv = require("dotenv");
dotenv.config();

const config = {
    DIR: __dirname,
    SERVER_DIR: __dirname + "/server",
    DB_DIR: __dirname + "/server/DB",
    HOST: "www.sproutcomp.pro",
    URL: "https://www.sproutcomp.pro",
    PORT: process.env.PORT || 3000,
    DB_URI: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST_1}/${process.env.MONGODB_NAME}`,
    DB_SESSIONS_URI: `mongodb+srv://sproutcompadmin:${process.env.MONGODB_PASS}@sproutcomprespald.0dazklo.mongodb.net/?retryWrites=true&w=majority&appName=SproutCompRespald`
};

module.exports = config;