import React, {useState, useEffect} from 'react';
import './MyReminders.css';
import $ from 'jquery';
import Axios from 'axios';
import Years from './myreminders/Years';

function MyReminders({calendar, userId}) {
    let [reminders, setReminders] = useState([]);
    let [years, setYears] = useState([]);
    let [selectedYear, setSelectedYear] = useState("");
    let html = calendar ? "hide" : "";

    const remindersCont = (year, cont) => {
        // return (

        // );
    }

    // const remsOfMonth = () => {
    //     return (
            
    //     );
    // }

    const appendRemsToYearCont = (reminder) => {
        let html = `
            <p key="${reminder.rem_id}">
                ${reminder.event_name} ${reminder.descript}
            </p>
        `;
        $(`#year${reminder.year}`).append(html);
        return;
    }

    useEffect(() => {
        Axios
        .get(`http://localhost:3000/reminders/getAllReminders/${userId}`)
        .then((res) => {
            console.log(res.data[1]);
            setReminders(res.data[0]);
            setYears(res.data[1]);
        })
    }, []);

    return (
        <div className={`myreminders ${html}`}>
            <Years years={years} reminders={reminders} />
            {/* {years.map((year) => yearCont(year.year))} */}
            {/* {reminders.map((reminder) => appendRemsToYearCont(reminder))} */}
        </div>
    );
}

export default MyReminders;