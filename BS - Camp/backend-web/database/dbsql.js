const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "BS-Cam",
    password: ""
})

db.connect((err) => {
    if(err) throw err;
    console.log("connected to mysql server");
})

module.exports = db;
