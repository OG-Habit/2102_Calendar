import React from "react";
import RemGoToCalendarBtn from "./RemGoToCalendarBtn";

function Reminder({month, remsYear, selectDate}) {
    let rems = remsYear.filter(rem => rem.month === month);

    const reminder = (reminder) => {
        let timeStart = reminder.time_start.split(":");
        let timeEnd = reminder.time_end.split(":");
        let tsampm, teampm;

        if(timeStart[0] > 12) {
            tsampm = "PM"
            timeStart[0] -= 12;
            timeStart[0] = timeStart[0].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        } else {
            tsampm = "AM"
        }

        if(timeEnd[0] > 12) {
            teampm = "PM"
            timeEnd[0] -= 12;
            timeStart[0] = timeEnd[0].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        } else {
            teampm = "AM"
        }
        
        return (
            <div className="myreminders__rem" key={`rem${reminder.rem_id}`} data-date={`${reminder.year}-${reminder.month}-${reminder.day}`}>
                <h5>{reminder.event_name}</h5>
                <RemGoToCalendarBtn selectDate={selectDate} />
                <p className="myreminders__descript">{reminder.descript}</p>
                <div className="myreminders__time">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    <p>{`${timeStart[0]}:${timeStart[1]} ${tsampm} - ${timeEnd[0]}:${timeEnd[1]} ${teampm} `}</p>
                    <p className="myreminders__date">{`${reminder.month+1}/${reminder.day}/${reminder.year}`}</p>
                </div>
            </div>
        );
    }

    return (
        rems.map(rem => reminder(rem))
    );
}

export default Reminder;