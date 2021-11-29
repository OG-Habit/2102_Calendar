import React, { Component } from 'react'
import './Reminder.css';
import {setState} from "react";
class Reminder extends Component {
    static num;
    constructor(props){
        super(props);
        this.day=props.day;
        this.month=props.month;
        this.year=props.year;  
        this.weekDay=new Date(props.year, props.month, props.day).getDay();
        this.monthStr=[
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May",
            "Jun.",
            "Jul.",
            "Aug.",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dec."
        ]
        this.state={
            reminder:"",
        }
    }

    setReminder=(event)=>{
        this.setState({reminder:event.target.value})   
    }

    displayReminder=()=>{
        alert(this.state.reminder)
    }
    

    render() {
        return (
            <div className="Reminder">
                <br></br><br></br>
                <p><h1>{this.weekDay}</h1></p>
                <h1>{this.monthStr[this.month]} {this.day}, {this.year}</h1>
                <br></br>
                <h3>Reminders:</h3>
                <input type="text" placeholder="New reminder" onChange={this.setReminder}/>
                <div id="cross" onClick={this.displayReminder}></div>
                
            </div>
        )
    }
}

export default Reminder
