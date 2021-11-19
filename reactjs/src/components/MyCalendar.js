import React, { Component } from 'react'
import './MyCalendar.css'
class MyCalendar extends Component {
    constructor(props){
        super(props);
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
        this.startDay = new Date(props.selectedYear, props.selectedMonth, 1).getDay();
        this.dayAmount = new Date(props.selectedYear, props.selectedMonth+1, 0).getDate();
    }

    selectDay = (e) => {
        const target = e.target.getAttribute("data-key");
        const arr_target = target.split('-');
        const selectedDate = new Date(arr_target[0], arr_target[1], arr_target[2]);
        this.props.selectDay(selectedDate);
    }

    listAllDays = () => {
        var dayList = [];
        const daysInPrevMonth = new Date(this.props.selectedYear, this.props.selectedMonth, 0).getDate();
        for(let i = daysInPrevMonth - this.startDay + 1; i <= daysInPrevMonth; i++){
            let key = new Date(this.props.selectedYear, this.props.selectedMonth-1, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        for(let i = 1; i <= this.dayAmount; i++){
            let key = new Date(this.props.selectedYear, this.props.selectedMonth, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        for(let i = 1; i <= dayList.length%7; i++){
            let key = new Date(this.props.selectedYear, this.props.selectedMonth+1, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        return dayList;
    }

    listReminder = (target) => {
        for(let reminder of this.props.reminders){
            if(target === reminder.year+"-"+reminder.month+"-"+reminder.day){
                return ' reminder';
            }
        }
    }

    render() {
        return (
            <div className="MyCalendar">
                <div className="calendar-year">
                    <i className="fas fa-angle-left" style={{padding: 10, fontSize: 38}}onClick={() => this.props.selectYear(this.selectedYear-1)}></i>
                    <h2>{this.selectedYear}</h2>
                    <i className="fas fa-angle-right" style={{padding: 10, fontSize: 38}} onClick={() => this.props.selectYear(this.selectedYear+1)}></i>
                </div>
                <div className="calendar-months">
                    {this.months.map((month, index) => (
                        <button 
                        type="button" 
                        key={index} 
                        className={(index === this.props.selectedMonth)? 'selected':''}
                        onClick={() => this.props.selectMonth(index)}>
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
                                (day[0].split('-')[2] === this.props.selectedDay.toString() && day[0].split('-')[1] === this.props.selectedMonth.toString())?' selected':'',
                                (day[0].split('-')[1] === this.props.selectedMonth.toString())?'':' hidden'
                                ].join('')}>
                                {day[1]}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default MyCalendar