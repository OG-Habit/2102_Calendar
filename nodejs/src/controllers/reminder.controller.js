'use strict';

const Reminders = require('../models/reminder.model');

exports.findByUserID = function(req, res) {
    Reminders.findByUserID(req.params.user_id, function(err, reminder) {
        if(err){
            res.send(err);
        }
        res.json({status: 200, data: reminder});
    });
}

exports.findByDate = function(req, res) {
    Reminders.findByDate(req.params.user_id, req.params.year, req.params.month, req.params.day, function(err, reminder) {
        if(err){
            res.send(err);
        }
        res.json({status: 200, data: reminder});
    });
}

exports.create = function(req, res) {
    const new_reminder = new Reminders(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields',
        });
    }
    else {
        Reminders.create(new_reminder, function(err, reminder) {
            if(err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "Reminder added successfully",
                data: reminder
            });
        });
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
        Reminders.update(req.params.rem_id, new Reminders(req.body), function(err, reminder) {
            if(err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "Reminder updated successfully",
                data: req.body
            });
        });
    }
}

exports.delete = function(req, res) {
    Reminders.delete(req.params.rem_id, function(err, reminder) {
        if(err) {
            res.send(err);
        }
        res.json({
            error: false,
            status: 200,
            message: "Reminder deleted successfully"
        });
    });
}

exports.getAllReminders = (req, res) => {
    let {user_id} = req.params;
    Reminders.getAllReminders(user_id, (err, reminder) => {
        if(err) {
            res.send(err);
        }
        else {
            res.send(reminder);
        }
    })
}