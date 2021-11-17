'use strict';
const User = require('../models/user.model');

exports.create = function(req, res) {
    const new_user = new User(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        User.create(new_user, function (err, user) {
            if(err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "User added successfully!", 
                data: user
            });
        })
    }
}

exports.findUser = function(req, res) {
    User.findUser(req.params, (err, user) => {
        if(err)
            res.send(err);
        else {
            let valid = user.length > 0 ? true : false;
            res.json({
                status: 200,
                valid: valid,
                obj: user[0]
            });
            if(valid) 
                req.session.userId = user[0].user_id;
            console.log(req.session);
        }
    });    
}