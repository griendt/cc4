const mysql = require('mysql2');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

migration.init(connection, __dirname + '/database/migrations')
