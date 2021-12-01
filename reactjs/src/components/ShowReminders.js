import React from 'react';

function ShowReminders({toggleCalendar, btntext}) {

    return (
        <button onClick={toggleCalendar} className="Navbar__btn">
            {btntext}
        </button>
    );
}

export default ShowReminders;