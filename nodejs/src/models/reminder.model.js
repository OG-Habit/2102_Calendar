'use strict';

var dbconn = require('../../config/db.config');

var Reminders = function(reminder) {
    this.user_id = reminder.user_id;
    this.event_name = reminder.event_name;
    this.descript = reminder.descript;
    this.year = reminder.year;
    this.month = reminder.month;
    this.day = reminder.day;
    this.time_start = reminder.time_start;
    this.time_end = reminder.time_end;
}

Reminders.findByUserID = function(user_id, result) {
    dbconn.query("SELECT * FROM reminders WHERE user_id=? AND is_deleted=FALSE", [user_id],
    function(err, res) {
        if(err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Reminders.create = function(newRem, result) {
    dbconn.query("INSERT INTO reminders SET ?", newRem, function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else {
            console.log(res);
            result(null, res.insertId);
        }
    });
}

Reminders.update = function(rem_id, reminder, result) {
    dbconn.query("UPDATE reminders SET event_name=?, descript=?, year=?, month=?, day=?, time_start=?, time_end=? WHERE rem_id=?", 
    [reminder.event_name, reminder.descript, reminder.year, reminder.month, reminder.day, reminder.time_start, reminder.time_end, rem_id], 
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

Reminders.delete = function(rem_id, result) {
    dbconn.query("UPDATE reminders SET is_deleted=1 WHERE rem_id=?", rem_id, function(err, res) {
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

module.exports = Reminders;