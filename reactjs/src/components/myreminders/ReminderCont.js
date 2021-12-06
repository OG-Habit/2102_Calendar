import React from 'react';
import Reminder from './Reminder';

function ReminderCont({year, reminders, selectDate}) {
    let remsYear = [...new Set(reminders.filter(item => item.year === year))];
    let monthsOfYear = [...new Set(remsYear.map(elem => elem.month))];

    const reminderCont = (year, month) => {
        return (
            <div key={`cont${year}${month}`} className="hide myreminders__rem-cont" id={`cont${year}${month}`}>
                <Reminder month={month} remsYear={remsYear} selectDate={selectDate} />
            </div>
        );
    }

    return (
        monthsOfYear.map(month => reminderCont(year, month))
    );
}

export default ReminderCont;