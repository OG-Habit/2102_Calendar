import React from "react";
import RemGoToCalendarBtn from "./RemGoToCalendarBtn";

function Reminder({month, remsYear, selectDate}) {
    let rems = remsYear.filter(rem => rem.month === month);

    const reminder = (reminder) => {
        return (
            <div className="myreminders__rem" key={`rem${reminder.rem_id}`} data-date={`${reminder.year}-${reminder.month}-${reminder.day}`}>
                <p>{reminder.event_name} {reminder.descript}</p>
                <RemGoToCalendarBtn selectDate={selectDate} />
            </div>
        );
    }

    return (
        rems.map(rem => reminder(rem))
    );
}

export default Reminder;