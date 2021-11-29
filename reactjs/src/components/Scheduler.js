import React, { Component } from 'react'
import MyCalendar from './MyCalendar'
import Reminder from './Reminder'
import './Scheduler.css'

class Scheduler extends Component {
    constructor() {
        super()
        this.state = {
            selectedDate: new Date(),
        }
    }

    selectDate = (year, month, day) => {
        this.setState({
            selectedDate: new Date(year, month, day),
        });
    }

    render() {
        return (
            <div className="Scheduler">
                <Reminder
                
                />
                <MyCalendar
                key={this.state.selectedDate}
                selectedDate={this.state.selectedDate}
                selectDate={this.selectDate}
                />
            </div>
        )
    }
}

export default Scheduler
