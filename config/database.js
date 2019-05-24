const mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_URI,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
})





