import './MyCalendar.css';
import React, { Component } from 'react';

class MyCalendar extends Component {
    constructor(){
        super();
        var today = new Date(2021, 11);
        this.state = {
            selectedDay: 0,
            selectedMonth: today.getMonth(),
            selectedYear: today.getFullYear(),
            startDay: new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            numDays: new Date(today.getFullYear(), today.getMonth()+1, 0).getDate(),
        }
    }

    getMonthDays = (month) => {
        this.setState({
            selectedMonth: month,
            startDay: new Date(this.state.selectedYear, month, 1).getDay(),
            numDays: new Date(this.state.selectedYear, month+1, 0).getDate(),
        });
    }

    nextPrevYears = (action) => {
        const year = (action === "next")? this.state.selectedYear+1 : this.state.selectedYear-1;
        this.setState({
            selectedYear: year,
            startDay: new Date(year, this.state.selectedMonth, 1).getDay(),
            numDays: new Date(year, this.state.selectedMonth+1, 0).getDate(),
        });
    }

    render() {
        return (
            <div className="MyCalendar">
                <div className="Year">
                    <i className="fas fa-angle-left prev" onClick={() => this.nextPrevYears("prev")}></i>
                    <p>{this.state.selectedYear}</p>
                    <p>{this.state.selectedMonth}</p>
                    <i className="fas fa-angle-right next" onClick={() => this.nextPrevYears("next")}></i>
                </div>
                <div className="Months">
                    <button type="button" onClick={() => this.getMonthDays(0)}>JAN</button>
                    <button type="button" onClick={() => this.getMonthDays(1)}>FEB</button>
                    <button type="button" onClick={() => this.getMonthDays(2)}>MAR</button>
                    <button type="button" onClick={() => this.getMonthDays(3)}>APR</button>
                    <button type="button" onClick={() => this.getMonthDays(4)}>MAY</button>
                    <button type="button" onClick={() => this.getMonthDays(5)}>JUN</button>
                    <button type="button" onClick={() => this.getMonthDays(6)}>JUL</button>
                    <button type="button" onClick={() => this.getMonthDays(7)}>AUG</button>
                    <button type="button" onClick={() => this.getMonthDays(8)}>SEP</button>
                    <button type="button" onClick={() => this.getMonthDays(9)}>OCT</button>
                    <button type="button" onClick={() => this.getMonthDays(10)}>NOV</button>
                    <button type="button" onClick={() => this.getMonthDays(11)}>DEC</button>
                </div>
                <div>
                    <div className="Weekdays">
                        <div>MON {this.state.startDay}</div>
                        <div>TUE {this.state.numDays}</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                        <div>SUN</div>
                    </div>
                    <div className="Days">
                        {[...Array(35)].map((x, i) =>
                            <div><button type="button">{(i+2-this.state.startDay > this.state.numDays || i+2-this.state.startDay < 1)?"-":i+2-this.state.startDay}</button></div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCalendar
 