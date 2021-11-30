import React, { Component, useEffect } from 'react'
import MyCalendar from './MyCalendar'
import Reminder from './Reminder'
import './Scheduler.css'

class Scheduler extends Component {
    constructor(props) {
        super(props)
        this.userId = props.userId;
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
                key={this.state.selectedDate+"-reminder"}
                selectedDate={this.state.selectedDate}
                userId={this.userId}
                />
                <MyCalendar
                key={this.state.selectedDate+"-calendar"}
                selectedDate={this.state.selectedDate}
                selectDate={this.selectDate}
                userId={this.userId}
                />
            </div>
        )
    }
}

export default Scheduler
