import React, {useState, useEffect} from 'react';
import MonthBtn from './MonthBtn';
import ReminderCont from './ReminderCont';
import $ from 'jquery';

function Years({years, reminders, selectDate}) {
    const [sort, setSort] = useState("all");
    const yearContHtml = (year) => {
        $(`#${year}sort`).on("change", e => {
            setSort(e.target.value)
        });

        useEffect(() => {
            if(sort === "all") {

            } else {
                $(".myreminders__rem").addClass("hide");
                $(".myreminders__rem-cont:not(.hide)").children(sort)
            }
        }, [sort]);

        return (    
            <div className="myreminders__year" key={year} id={`year${year}`}>
                <h1>{year}</h1>
                <select name="" id={`${year}sort`}>
                    <option value="all">All</option>
                    <option value="2">Ongoing</option>
                    <option value="3">Finished</option>
                    <option value="1">Unfinished</option>
                    <option value="0">Deleted</option>
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