import React, { Component } from 'react'
import MyCalendar from './MyCalendar'
import Reminder from './Reminder'
import './Scheduler.css'
import $ from 'jquery'

class Scheduler extends Component {
    constructor() {
        super()
        const today = new Date();
        this.state = {
            selectedDay: today.getDate(),
            selectedMonth: today.getMonth(),
            selectedYear: today.getFullYear(),
            reminders: [],
        }
    }

    componentDidMount() {
        let url = require('../config/reminder');
        let value = 1; // sample id
        let context = this;
        $.ajax({
            type: 'GET',
            url: url + '/' + value,
            success: function(res) {
                context.setState({
                    reminders: res.data
                });
            }
        });
    }

    selectYear = (year) => {
        this.setState({
            selectedDay: 0,
            selectedYear: year,
        });
    }

    selectMonth = (month) => {
        this.setState({
            selectedDay: 0,
            selectedMonth: month,
        });
    }

    selectDay = (date) => {
        this.setState({
            selectedDay: date.getDate(),
            selectedMonth: date.getMonth(),
            selectedYear:  date.getFullYear(),
        });
    }

    render() {
        return (
            <div className="Scheduler">
                <Reminder />
                <MyCalendar
                selectDay={this.selectDay}
                selectMonth={this.selectMonth}
                selectYear={this.selectYear}
                selectedDay={this.state.selectedDay}
                selectedMonth={this.state.selectedMonth}
                selectedYear={this.state.selectedYear}
                reminders={this.state.reminders}
                />
            </div>
        )
    }
}

export default Scheduler
