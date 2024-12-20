
require('dotenv').config();

module.exports = {
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_bin"
        // underscored: true // coluna_tal
    },
    dialect: process.env.DB_DIALECT || "mysql",
    timezone: "-03:00",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 3306,
    logging: false
};