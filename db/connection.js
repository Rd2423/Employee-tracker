const sql = require('mysql2');

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Batman2423$',
    database: 'employeeRecord'
});

module.exports = db;