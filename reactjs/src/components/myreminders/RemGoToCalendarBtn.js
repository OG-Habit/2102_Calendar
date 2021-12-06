import React from "react";
import $ from 'jquery';

function RemGoToCalendarBtn() {
    const goToCalendar = (e) => {
        $("#togCalRemBtn").trigger("click");
        
    }

    return (
        <button onClick={goToCalendar}>
            Go To
        </button>
    );
}

export default RemGoToCalendarBtn;