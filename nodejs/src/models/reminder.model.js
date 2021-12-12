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
    this.status = reminder.status;
}

Reminders.findByUserID = function(user_id, result) {
    dbconn.query("SELECT * FROM reminders WHERE user_id=? AND status != 'deleted'", [user_id],
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
    dbconn.query("SELECT * FROM reminders WHERE user_id=? AND year=? AND month=? AND day=? AND status !='deleted'",
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
    newRem.status = 'ongoing' //default value
    dbconn.query("INSERT INTO reminders SET ?", newRem, function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else {
            console.log(res);
            Reminders.updateStatusOfAllReminders(newRem.user_id);
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
    dbconn.query("UPDATE reminders SET status='deleted' WHERE rem_id=?", rem_id, function(err, res) {
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
    let month = today.getMonth();
    let year = today.getFullYear();
    let time = today.getHours().toLocaleString("en-US", {useGrouping: false, minimumIntegerDigits: 2}) + ":" + today.getMinutes().toLocaleString("en-US", {useGrouping: false, minimumIntegerDigits: 2});
    let sql1 = `
        UPDATE reminders SET status = "finished"
        WHERE
        user_id = ${user_id} AND status != "deleted" AND
        (year < ${year} OR
        year = ${year} AND month < ${month} OR
        year = ${year} AND month = ${month} AND day < ${day} OR
        year = ${year} AND month = ${month} AND day = ${day} AND '${time}' > time_end);
    `;
    let sql2 = `
        UPDATE reminders SET status = "ongoing"
        WHERE
        user_id = ${user_id} AND status != "deleted" AND
        (year = ${year} AND month = ${month} AND day = ${day} AND 
        '${time}' >= time_start AND '${time}' <= time_end);
    `;
    let sql3 = `
        UPDATE reminders SET status = "unfinished"
        WHERE
        user_id = ${user_id} AND status != "deleted" AND
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
    let remindersSql = `SELECT * FROM reminders where user_id = ${user_id} AND status != "deleted";`;
    let yearsSql = `
        SELECT DISTINCT year FROM reminders 
        WHERE 
        user_id = ${user_id} AND
        status != "deleted"
        ORDER BY year ASC;
    `;
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