import Axios from 'axios'
import React, { Component } from 'react'
import MyCalendar from './MyCalendar'
import MyReminders from './MyReminders'
import Reminder from './Reminder'
import { Spinner } from 'react-bootstrap'
import './Scheduler.css'
class Scheduler extends Component {
    constructor(props) {
        super(props)
        this.userId = props.userId;
        this.state = {
            selectedDate: new Date(),
            reminders: [],
            name: "",
            loadReminders: null,
            loadName: null
        }
    }

    getRemindersById = () => {
        let value = `/${this.props.userId}`
        Axios
        .get(require('../config/reminder') + value)
        .then((res) => {
            let {data} = res.data;
            this.setState({
                reminders: data,
                loadReminders: false
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getUsername = (userId) => {
        Axios
        .get(`http://localhost:3000/accsetup/getuser/${userId}`)
        .then((res) => {
            let {data} = res.data;
            this.setState({
                name: `${data.firstname}  ${data.lastname}`,
                loadName: false
            }) 
        })
        .catch((err) => {
            console.log(err);
        })
    }

    loadAsync = (userId) => {
        this.setState({
            loadReminders: true,
            loadName: true,
        })
        this.getRemindersById();
        this.getUsername(userId);
    }

    componentDidMount() {
        this.loadAsync(this.props.userId);
    }

    componentDidUpdate(prevProps) {
        if(this.props.userId !== prevProps.userId) {
            this.loadAsync(this.props.userId);
        }
    }

    

    selectDate = (year = this.state.selectedDate.getYear(), month = this.state.selectedDate.getMonth(), day = this.state.selectedDate.getDate()) => {
        this.setState({
            selectedDate: new Date(year, month, day),
        });
    }

    
    
    render() {
        return this.state.loadName || this.state.loadReminders ?
        (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        ) : 
        (
            <div className="container-fluid">
                <div className="Scheduler">
                    <Reminder
                    key={this.state.selectedDate+"-reminder"}
                    selectedDate={this.state.selectedDate}
                    name={this.state.name}
                    userId={this.userId}
                    load={this.loadAsync}
                    />
                    <MyCalendar
                    key={this.state.selectedDate+"-calendar"}
                    selectedDate={this.state.selectedDate}
                    selectDate={this.selectDate}
                    reminders={this.state.reminders}
                    calendar={this.props.calendar}
                    />
                    <MyReminders
                    calendar={this.props.calendar}
                    userId={this.userId}
                    selectDate={this.selectDate}
                    />
                </div>
            </div>
        )
    }
}

export default Scheduler
