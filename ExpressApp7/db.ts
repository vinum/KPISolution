import mysql = require('mysql');

var connection = mysql.createPool({

    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Zmowafy@IBM',
    database: 'kpidb'

});
module.exports = connection;
