import React, {useState, useEffect} from 'react';
import './MyReminders.css';
import $ from 'jquery';
import Axios from 'axios';

function MyReminders({calendar, userId}) {
    let [reminders, setReminders] = useState([]);
    let [years, setYears] = useState([]);
    let [selectedYear, setSelectedYear] = useState("");
    let html = calendar ? "hide" : "";

    const yearCont = (year) => {
        return (
            <div className="myreminders__year" key={year} id={`year${year}`}>
                <h1>{year}</h1>
                <hr />
            </div>
        )
    }

    const appendToYearCont = (reminder) => {
        let html = `
            <p key={${reminder.rem_id}}>
                ${reminder.event_name} ${reminder.descript}
            </p>
        `;
        $(`#year${reminder.year}`).append(html);
    }

    useEffect(() => {
        Axios
        .get(`http://localhost:3000/reminders/getAllReminders/${userId}`)
        .then((res) => {
            console.log(res.data);
            setReminders(res.data[0]);
            setYears(res.data[1]);
        })
    }, []);

    return (
        <div className={`myreminders ${html}`}>
            {years.map((year) => yearCont(year.year))}
            {reminders.map((reminder) => appendToYearCont(reminder))}
        </div>
    );
}

export default MyReminders;