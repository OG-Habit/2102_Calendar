'use strict';

var dbconn = require("./../../config/db.config");

var User = function(user) {
    this.firstname = user.fname;
    this.lastname =  user.lname;
    this.email = user.email;
    this.password = user.password;
    this.icon = user.icon;
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

User.findUser = function(params, result) {
    let {email, password} = params;
    dbconn.query(
        "SELECT user_id, firstname FROM users WHERE email = ? AND password = ?", 
        [email, password], 
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
}

User.getUser = (params, result) => {
    let {id} = params;
    dbconn.query(
        "SELECT * FROM users WHERE user_id = ?",
        [id],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    )
}

User.update = function(user_id, user, result) {
    dbconn.query("UPDATE users SET firstname=?, lastname=?, password=?, icon=? WHERE user_id=?", 
    [user.firstname, user.lastname, user.password, user.icon, user_id], 
    function (err, res) {
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

module.exports = User;