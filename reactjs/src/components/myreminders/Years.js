import React from 'react';
import MonthBtn from './MonthBtn';
import ReminderCont from './ReminderCont';
import $ from 'jquery';

function Years({years, reminders, selectDate}) {
    const yearContHtml = (year) => {
        $(`#${year}sort`).on("change", e => {
            let value = e.target.value
            if(value === "all") {
                $(`year${year}`).children(".myreminders__rem").removeClass("hide");
            } else {
                $(`year${year}`).children(".myreminders__rem").addClass("hide");
                $(`year${year}`).children(`.myreminders__rem--${value}`).removeClass("hide");
            }
        });

        return (    
            <div className="myreminders__year" key={year} id={`year${year}`}>
                <h1>{year}</h1>
                <select name="" id={`${year}sort`}>
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                    <option value="unfinished">Unfinished</option>
                    {/* <option value="deleted">Deleted</option> */}
                </select>
                <hr />
                <div className="myreminders__month-cont">
                    <MonthBtn year={year} reminders={reminders} />
                </div>
                <ReminderCont year={year} reminders={reminders} selectDate={selectDate} />
            </div>
        )
    }

    return (
        years.map(year => yearContHtml(year.year))
    );
}

export default Years;