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

exports.findById = function(req, res) {
    User.findById(req.params.id, (err, user) => {
        if(err)
            res.send(err);
        res.json({
            status: 200,
            data: user
        });
    })
}