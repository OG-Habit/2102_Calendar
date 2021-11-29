'use strict';

var dbconn = require('../../config/db.config');

var Reminders = function(reminder) {
    this.user_id = reminder.user_id;
    this.event_name = reminder.event_name;
    this.descript = reminder.descript;
    this.year = reminder.year;
    this.month = reminder.month;
    this.day = reminder.day;
    this.time = reminder.time;
}

Reminders.findByUserID = function(user_id, result) {
    dbconn.query("SELECT * FROM reminders WHERE user_id = ?", [user_id],
    function(err, res) {
        if(err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Reminders;