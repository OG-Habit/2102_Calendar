'use strict';
const mysql = require("mysql");

const dbconn = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'reminders_db'
});
dbconn.connect((err) => {
    if(err)
        throw err;
    console.log("Database Connected!");
});
module.exports = dbconn;