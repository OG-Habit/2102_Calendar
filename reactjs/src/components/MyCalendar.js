import React, { Component } from 'react'
import './MyCalendar.css'
import Reminder from './Reminder'

class MyCalendar extends Component {
    constructor(){
        super();
        const today = new Date();
        this.months = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
        ];
        this.state = {
            selectedDay: today.getDate(),
            selectedMonth: today.getMonth(),
            selectedYear: today.getFullYear(),
            startDay: new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            dayAmount: new Date(today.getFullYear(), today.getMonth()+1, 0).getDate(),
            reminders: [{
                eventName: '',
                desc: '',
                day: 1,
                month: 11,
                year: 2021,
                time: 0,
            }],
        }
    }

    selectMonth = (month) => {
        this.setState({
            selectedDay: 0,
            selectedMonth: month,
            startDay: new Date(this.state.selectedYear, month, 1).getDay(),
            dayAmount: new Date(this.state.selectedYear, month+1, 0).getDate(),
        });
    }

    selectYear = (action) => {
        const year = (action === "next")? this.state.selectedYear+1 : this.state.selectedYear-1;
        this.setState({
            selectedDay: 0,
            selectedYear: year,
            startDay: new Date(year, this.state.selectedMonth, 1).getDay(),
            dayAmount: new Date(year, this.state.selectedMonth+1, 0).getDate(),
        });
    }

    selectDay = (e) => {
        const target = e.target.getAttribute("data-key");
        const arr_target = target.split('-');
        const selectedDate = new Date(arr_target[0], arr_target[1], arr_target[2]);
        this.setState({
            selectedDay: selectedDate.getDate(),
            selectedMonth: selectedDate.getMonth(),
            selectedYear:  selectedDate.getFullYear(),
            startDay: new Date(arr_target[0], arr_target[1], 1).getDay(),
            dayAmount: new Date(arr_target[0], Number(arr_target[1])+1, 0).getDate(),
        });
        e.preventDefault();
    }

    listAllDays = () => {
        var dayList = [];
        const daysInPrevMonth = new Date(this.state.selectedYear, this.state.selectedMonth, 0).getDate();
        for(let i = daysInPrevMonth - this.state.startDay + 1; i <= daysInPrevMonth; i++){
            let key = new Date(this.state.selectedYear, this.state.selectedMonth-1, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        for(let i = 1; i <= this.state.dayAmount; i++){
            let key = new Date(this.state.selectedYear, this.state.selectedMonth, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        for(let i = 1; i <= dayList.length%7; i++){
            let key = new Date(this.state.selectedYear, this.state.selectedMonth+1, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        return dayList;
    }

    listReminder = (target) => {
        for(let reminder of this.state.reminders){
            if(target === reminder.year+"-"+reminder.month+"-"+reminder.day){
                return ' reminder';
            }
        }
    }

    render() {
        return (
            <div className="Scheduler">
                <Reminder />
                <div className="MyCalendar">
                    <div className="calendar-year">
                        <i className="fas fa-angle-left" style={{padding: 10, fontSize: 38}} onClick={() => this.selectYear("prev")}></i>
                        <h2>{this.state.selectedYear}</h2>
                        <i className="fas fa-angle-right" style={{padding: 10, fontSize: 38}} onClick={() => this.selectYear("next")}></i>
                    </div>
                    <div className="calendar-months">
                        {this.months.map((month, index) => (
                            <button 
                            type="button" 
                            key={index} 
                            className={(index === this.state.selectedMonth)? 'selected':''}
                            onClick={() => this.selectMonth(index)}>
                                {month}
                            </button>
                        ))}
                    </div>
                    <div className="calendar-weekdays">
                        <div>SUN</div>
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                    </div>
                    <div className="calendar-days">
                        {Array.from(this.listAllDays()).map((day) => (
                            <div key={day[0]}>
                                <button 
                                type="button"
                                data-key={day[0]}
                                onClick={this.selectDay}
                                className={[
                                    'btn btn-outline-danger',
                                    this.listReminder(day[0]),
                                    (day[0].split('-')[2] === this.state.selectedDay.toString() && day[0].split('-')[1] === this.state.selectedMonth.toString())?' selected':'',
                                    (day[0].split('-')[1] === this.state.selectedMonth.toString())?'':' hidden'
                                    ].join('')}>
                                    {day[1]}
                                </button>
                            </div>
                        ))}
                    </div>
            </div>
            </div>
        )
    }
}

export default MyCalendar