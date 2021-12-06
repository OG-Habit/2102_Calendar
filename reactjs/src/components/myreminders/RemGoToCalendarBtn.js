import React from "react";
import $ from 'jquery';

function RemGoToCalendarBtn({selectDate}) {
    const getDate = e => {
        const date = $(e.target).parent().attr("data-date");
        return date.split("-");
    }
    
    const goToCalendar = (e) => {
        let date = getDate(e);
        $("#togCalRemBtn").trigger("click");
        selectDate(date[0], date[1], date[2]);
    }

    return (
        <button onClick={goToCalendar}>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            &nbsp;  
            Go To
        </button>
    );
}

export default RemGoToCalendarBtn;