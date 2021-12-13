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
        const {selectedDate} = props;
        this.startDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
        this.dayAmount = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 0).getDate();
        this.selectedDay = selectedDate.getDate();
        this.selectedMonth = selectedDate.getMonth();
        this.selectedYear = selectedDate.getFullYear();
        this.userId = props.userId;
        this.reminders = props.reminders;
        this.state = {
            reminders: [
                {
                    year: 0,
                    month: 0,
                    day: 0,
                }
            ]
        }
    }
    

    selectYear = (year) => {
        this.props.selectDate(year);
    }

    selectMonth = (month) => {
        this.props.selectDate(this.selectedYear, month);
    }

    selectDay = (e) => {
        const target = e.target.getAttribute("data-key");
        const arr_target = target.split('-');
        this.props.selectDate(arr_target[0], arr_target[1], arr_target[2]);
    }

    listAllDays = () => {
        var dayList = [];
        const {startDay, dayAmount, selectedYear, selectedMonth} = this;
        const daysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        for(let i = daysInPrevMonth - startDay + 1; i <= daysInPrevMonth; i++){
            let key = new Date(selectedYear, selectedMonth-1, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        for(let i = 1; i <= dayAmount; i++){
            let key = new Date(selectedYear, selectedMonth, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        for(let i = 1; i <= dayList.length%14; i++){
            let key = new Date(selectedYear, selectedMonth+1, i);
            dayList.push([key.getFullYear()+"-"+key.getMonth()+"-"+key.getDate(),i]);
        }
        return dayList;
    }

    listReminder = (target) => {
        for(let reminder of this.reminders){
            if(target === reminder.year+"-"+reminder.month+"-"+reminder.day){
                return ` reminder ${reminder.status}`;
            }
        }
    }

    render() {
        this.calendarClass = this.props.calendar ? "" : "hide";
        return (
            <div className={"MyCalendar " + this.calendarClass}> 
                <div className="calendar-year">
                    <i className="fas fa-angle-left" style={{padding: 10, fontSize: 38}} onClick={() => this.selectYear(this.selectedYear-1)}/>
                    <h2>{this.selectedYear}</h2>
                    <i className="fas fa-angle-right" style={{padding: 10, fontSize: 38}} onClick={() => this.selectYear(this.selectedYear+1)}/>
                </div>
                <div className="calendar-months">
                    {this.months.map((month, index) => (
                        <button 
                        type="button" 
                        key={index} 
                        className={(index === this.selectedMonth)? 'selected':''}
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
                                'btn btn-outline-primary',
                                this.listReminder(day[0]),
                                (day[0].split('-')[2] === this.selectedDay.toString() && day[0].split('-')[1] === this.selectedMonth.toString())?' selected':'',
                                (day[0].split('-')[1] === this.selectedMonth.toString())?'':' hidden'
                                ].join('')}>
                                {day[1]}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="row justify-content-end mt-4">
                <div className="col-2 row">
                        <span className="color-code selected2 col-1"/>
                        <label className="col label-color">- Selected</label>
                    </div>
                    <div className="col-2 row">
                        <span className="color-code unfinished col-1"/>
                        <label className="col label-color">- Unfinished</label>
                    </div>
                    <div className="col-2 row">
                        <span className="color-code ongoing col-1"/>
                        <label className="col label-color">- Ongoing</label>
                    </div>
                    <div className="col-2 row">
                         <span className="color-code finished col-1"/>
                        <label className="col label-color">- Finished</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCalendar