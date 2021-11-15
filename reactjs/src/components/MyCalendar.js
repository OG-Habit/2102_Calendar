import Calendar from 'react-calendar';
import './Calendar.css';

import React, { Component } from 'react'

class MyCalendar extends Component {
    render() {
        return (
            <div className="MyCalendar">
                <Calendar />
            </div>
        )
    }
}

export default MyCalendar
