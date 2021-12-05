import React from "react";

function Reminder({month, remsYear}) {
    let rems = remsYear.filter(rem => rem.month == month);

    console.log(rems);

    const reminder = (reminder) => {
        return (
            <p className="myreminders__rem" key={`rem${reminder.rem_id}`}>
                {reminder.event_name} {reminder.descript}
            </p>
        );
    }

    return (
        rems.map(rem => reminder(rem))
    );
}

export default Reminder;