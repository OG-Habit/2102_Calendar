import React, {useState, useEffect} from 'react';
import './MyReminders.css';
import Axios from 'axios';
import Years from './myreminders/Years';

function MyReminders({calendar, userId, selectDate}) {
    let [reminders, setReminders] = useState([]);
    let [years, setYears] = useState([]);
    let html = calendar ? "hide" : "";

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
            <Years years={years} reminders={reminders} selectDate={selectDate} />
        </div>
    );
}

export default MyReminders;