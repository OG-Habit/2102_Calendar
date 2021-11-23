import React, { Component } from 'react'
import './Reminder.css';
class Reminder extends Component {
    static num;
    constructor(props){
        super(props);
        this.day=props.day;
        this.month=props.month;
        this.year=props.year;  
        this.weekDay=new Date(props.year, props.month, props.day).getDay();
        this.monthStr=[
            "JAN.",
            "FEB.",
            "MAR.",
            "APR.",
            "MAY",
            "JUN.",
            "JUL.",
            "AUG.",
            "SEP.",
            "OCT.",
            "NOV.",
            "DEC."
        ]
    }

    render() {
        return (
            <div className="Reminder">
                <p><h1>{this.weekDay}</h1></p>
                <h1>{this.monthStr[this.month]}{this.day},{this.year}</h1>
            </div>
        )
    }
}

export default Reminder
