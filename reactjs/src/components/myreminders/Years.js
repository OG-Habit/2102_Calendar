import React from 'react';
import MonthBtn from './MonthBtn';
import ReminderCont from './ReminderCont';
import $ from 'jquery';

function Years({years, reminders, selectDate}) {
    const isRemContEmpty = (remCont) => {
        if($(remCont).find(".myreminders__rem:not(.hide)").length === 0) {
            return true;
        } else {
            return false;
        }   
    }

    const loopThroughRemCont = (year) => {
        $(`#year${year}`).find(".myreminders__rem-cont").each((index, elem) => {
            if(isRemContEmpty(elem)) {
                $(elem).find(".myreminders__empty").removeClass("hide");
            }
        });
    }

    const yearContHtml = (year) => {
        $(`#${year}sort`).on("change", e => {
            let value = e.target.value
            if(value === "all") {
                $(`#year${year}`).find(".myreminders__rem").removeClass("hide");
            } else {
                $(`#year${year}`).find(".myreminders__rem").addClass("hide");
                $(`#year${year}`).find(`.myreminders__rem--${value}`).removeClass("hide");
            }

            $(`#year${year}`).find(".myreminders__empty").addClass("hide");
            loopThroughRemCont(year);
        });

        return (    
            <div className="myreminders__year" key={year} id={`year${year}`}>
                <div className='myreminders__header'>
                    <h1>{year}</h1>
                    <select name="" id={`${year}sort`}>
                        <option value="all">All</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="finished">Finished</option>
                        <option value="unfinished">Unfinished</option>
                        {/* <option value="deleted">Deleted</option> */}
                    </select>
                </div>
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