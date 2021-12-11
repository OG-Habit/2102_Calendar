'use strict';
const User = require('../models/user.model');

exports.create = function(req, res) {
    req.body.icon = 'icon1';
    const new_user = new User(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        User.create(new_user, function (err, user) {
            if(err) {
                res.json({
                    success: false,
                    message: "Email is already used."
                })
            }
            else {
                res.json({
                    success: true,
                    status: 200,
                    message: "User added successfully!", 
                    data: user
                });
            }
        })
    }
}

exports.findUser = function(req, res) {
    User.findUser(req.params, (err, user) => {
        if(err)
            res.send(err);
        else {
            let valid = user.length > 0 ? true : false;
            let obj = {
                status: 200,
                valid: valid,
            }
            if(valid) {
                req.session.userId = user[0].user_id;
                obj.data = user[0];
                res.json(obj);
            } else {
                res.json(obj);
            }
        }
    });    
}

exports.getUser = (req, res) => {
    User.getUser(req.params, (err, user) => {
        if(err)
            res.send(err);
        else {
            let valid = user.length > 0 ? true : false;
            let obj = {
                status: 200,
                valid: valid
            }
            if(valid) {
                obj.data = user[0];
                res.json(obj);
            } else {
                obj.errorMsg = "User is not found on the database!";
                res.json(obj);
            }
        }
    })
}

exports.logout = (req, res) => {
    if(req.session.userId) {
        req.session.destroy((err) => {
            if(err)
                res.send(err)
            else {
                res.send("User logout!");
            }
        })
    } else {
        res.send("No account logged in!");
    }
}

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields',
        });
    }
    else {
        User.update(req.params.id, new User(req.body), function(err, user) {
            if(err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "User updated successfully",
                data: req.body
            });
        });
    }
}