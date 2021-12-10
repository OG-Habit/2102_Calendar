import React from 'react';
import $ from 'jquery';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function MonthBtn({year, reminders}) {
    let rems = [...new Set(reminders.filter(item => item.year === year))];
    let monthsOfYear = [...new Set(rems.map(elem => elem.month))];
    monthsOfYear.sort((first, second) => first - second);

    const show = (e,year, month) => {
        $(`.myreminders__rem-cont`).addClass("hide");
        $(`#cont${year}${month}`).removeClass("hide");
        $(`.myreminders__month-cont button`).removeClass("myreminders__month--focus");
        $(e.target).addClass("myreminders__month--focus");
    }

    const btnMonthCont = (year, month) => {
        return (
            <button className='myreminders__month' key={`btn${year}${month}`} onClick={(e) => show(e,year,month)} >
                {months[month]}
            </button>
        );
    }

    return (
        monthsOfYear.map(month => btnMonthCont(year,month))
    );
}

export default MonthBtn;