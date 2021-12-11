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
            icon: "",
            loadReminders: true,
            loadName: true
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

    getUser = () => {
        Axios
        .get(`http://localhost:3000/accsetup/getuser/${this.props.userId}`)
        .then((res) => {
            let {data} = res.data;
            this.setState({
                name: `${data.firstname}!`,
                icon: data.icon,
                loadName: !this.state.loadName
            }) 
        })
        .catch((err) => {
            console.log(err);
        })
    }

    loadAsync = () => {
        this.setState({
            loadReminders: true,
        })
        this.getRemindersById();
    }

    componentDidMount() {
        this.loadAsync();
        this.getUser()
    }

    // componentDidUpdate(prevProps) {
    //     if(this.props.userId !== prevProps.userId) {
    //         this.loadAsync(this.props.userId);
    //     }
    // }

    

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
                <div className="Scheduler">
                    <Reminder
                    key={this.state.selectedDate+"-reminder"}
                    selectedDate={this.state.selectedDate}
                    name={this.state.name}
                    icon={this.state.icon}
                    userId={this.userId}
                    load={this.loadAsync}
                    calendar={this.props.calendar}
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
        )
    }
}

export default Scheduler
