import React from 'react';
import MonthBtn from './MonthBtn';
import ReminderCont from './ReminderCont';

function Years({years, reminders}) {
    const yearContHtml = (year) => {
        return (
            <div className="myreminders__year" key={year} id={`year${year}`}>
                <h1>{year}</h1>
                <hr />
                <div className="myreminders__month-cont">
                    <MonthBtn year={year} reminders={reminders} />
                </div>
                <ReminderCont year={year} reminders={reminders} />
            </div>
        )
    }

    return (
        years.map(year => yearContHtml(year.year))
    );
}

export default Years;