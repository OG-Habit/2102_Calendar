import React from 'react';
import $ from 'jquery';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function MonthBtn({year, reminders}) {
    let rems = [...new Set(reminders.filter(item => item.year === year))];
    let monthsOfYear = [...new Set(rems.map(elem => elem.month))];
    monthsOfYear.sort((first, second) => first - second);

    const show = (year, month) => {
        $(`.myreminders__rem-cont`).addClass("hide");
        $(`#cont${year}${month}`).removeClass("hide");
    }

    const btnMonthCont = (year, month) => {
        return (
            <button key={`btn${year}${month}`} onClick={() => show(year,month)} >
                {months[month]}
            </button>
        );
    }

    return (
        monthsOfYear.map(month => btnMonthCont(year,month))
    );
}

export default MonthBtn;