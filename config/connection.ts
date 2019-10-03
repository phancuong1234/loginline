var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "dictionary"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
});