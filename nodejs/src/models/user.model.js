'use strict';

var dbconn = require("./../../config/db.config");

var User = function(user) {
    this.firstname = user.fname;
    this.lastname =  user.lname;
    this.email = user.email;
    this.password = user.password;
};

User.create = function(newUser, result) {
    dbconn.query("INSERT INTO users SET ?", newUser, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })
}

User.findById = function(id, result) {
    dbconn.query("SELECT * FROM users WHERE user_id =?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else 
            result(null, res);
    });
}

module.exports = User;