import React, { Component } from 'react';
import './MyCalendar.css';

class MyCalendar extends Component {
    constructor(){
        super();
        var today = new Date();
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
            selectedDay: 0,
            selectedMonth: today.getMonth(),
            selectedYear: today.getFullYear(),
            startDay: new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            dayAmount: new Date(today.getFullYear(), today.getMonth()+1, 0).getDate(),
        }
    }

    changeMonth = (month) => {
        this.setState({
            selectedMonth: month,
            startDay: new Date(this.state.selectedYear, month, 1).getDay(),
            dayAmount: new Date(this.state.selectedYear, month+1, 0).getDate(),
        });
    }

    changeYear = (action) => {
        const year = (action === "next")? this.state.selectedYear+1 : this.state.selectedYear-1;
        this.setState({
            selectedYear: year,
            startDay: new Date(year, this.state.selectedMonth, 1).getDay(),
            dayAmount: new Date(year, this.state.selectedMonth+1, 0).getDate(),
        });
    }

    listAllDays = () => {
        var dayList = [];
        const daysInPrevMonth = new Date(this.state.selectedYear, this.state.selectedMonth, 0).getDate();
        for(let i = daysInPrevMonth - this.state.startDay + 2; i <= daysInPrevMonth; i++){
            dayList.push(i);
            console.log(daysInPrevMonth);
        }
        for(let i = 1; i <= this.state.dayAmount; i++){
            dayList.push(i);
        }
        for(let i = 1; dayList.length < 35; i++){
            dayList.push(i);
        }
        return dayList;
    }

    render() {
        return (
            <div className="MyCalendar">
                <div className="calendar-year">
                    <i className="fas fa-angle-left prev" style={{padding: 10, fontSize: 48}} onClick={() => this.changeYear("prev")}></i>
                    <p>{this.state.selectedYear}</p>
                    <p>{this.months[this.state.selectedMonth]}</p>
                    <i className="fas fa-angle-right next" style={{padding: 10, fontSize: 48}} onClick={() => this.changeYear("next")}></i>
                </div>
                <div className="calendar-months">
                    {this.months.map((month, index) => (
                        <button type="button" key={index} onClick={() => this.changeMonth(index)}>{month}</button>
                    ))}
                </div>
                <div>
                    <div className="calendar-weekdays">
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                        <div>SUN</div>
                    </div>
                    <div className="calendar-days">
                        {Array.from(this.listAllDays()).map((day, index) => (
                            <div key={index}> {/* Sorry for the magic numbers but it is there to keep the formatting */}
                                <button 
                                type="button" 
                                id={index} 
                                className={(index < this.state.startDay - 1 || index > this.state.dayAmount + this.state.startDay - 2)?"hidden":"show"}>
                                    {day}
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
 