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