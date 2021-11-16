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
            console.log(res);
            result(null, res.insertId);
        }
    })
}

User.findUser = function(obj, result) {
    dbconn.query(
        "SELECT * FROM users WHERE email = ? AND password = ?", 
        [obj.email, obj.password], 
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            } else 
                result(null, res);
        }
    );
}

module.exports = User;