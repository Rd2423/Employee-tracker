const path = require('path')
const sql = require('mysql2');

const db = sql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Batman2423$',
    database: 'employeeRecord'
});
db.connect((err) => {
    if (err) throw err;
});

module.exports = db;