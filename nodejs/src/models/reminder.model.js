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

Reminders.findByDate = function(user_id, year, month, day, result) {
    dbconn.query("SELECT * FROM reminders WHERE user_id=? AND year=? AND month=? AND day=? AND is_deleted=FALSE",
    [user_id, year, month, day],
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

Reminders.updateStatusOfAllReminders = (user_id) => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes();
    let sql1 = `
        UPDATE reminders SET status = 2
        WHERE
        user_id = ${user_id} AND
        (year < ${year} OR
        year = ${year} AND month < ${month} OR
        year = ${year} AND month = ${month} AND day < ${day} OR
        year = ${year} AND month = ${month} AND day = ${day} AND '${time}' > time_end);
    `;
    let sql2 = `
        UPDATE reminders SET status = 1
        WHERE
        user_id = ${user_id} AND
        (year = ${year} AND month = ${month} AND day = ${day} AND 
        '${time}' >= time_start AND '${time}' <= time_end);
    `;
    let sql3 = `
        UPDATE reminders SET status = 0
        WHERE
        user_id = ${user_id} AND
        (year > ${year} OR
        year = ${year} AND month > ${month} OR
        year = ${year} AND month = ${month} AND day > ${day} OR
        year = ${year} AND month = ${month} AND day = ${day} AND '${time}' < time_start);
    `
    let sql = sql1.concat(sql2, sql3);
    dbconn.query(
        sql,
        (err, res) => {
            if(err)
                console.log(err);
        }
    )
}    

Reminders.getAllReminders = (user_id, result) => {
    let remindersSql = `SELECT * FROM reminders where user_id = ${user_id};`;
    let yearsSql = `SELECT DISTINCT year FROM reminders WHERE user_id = ${user_id} ORDER BY year DESC;`;
    let sql = remindersSql + yearsSql;
    dbconn.query(
        sql,
        (err, res) => {
            if(err) {
                result(err, null);
            } else {
                result(null, res)
            }
        }
    )
}

module.exports = Reminders;