import React, { Component } from 'react'
import './Reminder.css';
import ReminderModal from './ReminderModal';
import Axios from 'axios';
class Reminder extends Component {
    static num;
    constructor(props){
        super(props);
        this.day=props.selectedDate.getDate();
        this.month=props.selectedDate.getMonth();
        this.year=props.selectedDate.getFullYear();  
        this.weekDay=props.selectedDate.getDay();
        this.monthStr=[
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May",
            "Jun.",
            "Jul.",
            "Aug.",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dec."
        ]
        this.state={
            showModal: false,
            reminders: [],
            reminder: null,
            name: "Guest",
            id: null
        }
    }

    setReminder=(event)=>{
        this.setState({reminder:event.target.value})   
    }

    displayReminder=()=>{
        alert(this.state.reminders)
    }

    getUser = () => {
        Axios
        .get(`http://localhost:3000/accsetup/getuser/${this.state.id}`)
        .then((res) => {
            let {valid, errorMsg, data} = res.data;
            this.setState({
                name: `${data.firstname} ${data.lastname}`
            })
        })
    }

    getReminders = () => {
        let values = `/${this.state.id}-${this.year}-${this.month}-${this.day}`
        Axios
        .get(require('../config/reminderDate') + values)
        .then((res) => {
            let data = res.data.data;
            this.setState({
                reminders: data
            })
        })
    }
    
    componentDidMount() {
        Axios
            .get("http://localhost:3000/accsetup")
            .then((res) => {
                let data = res.data;
                console.log(data);
                if(data.loggedIn) {
                    this.setState({
                        id: data.id
                    });
                    this.getUser();
                    this.getReminders();
                }
            })
    }

    setShowModal = (value) => {
        this.setState({
            showModal: value
        })
    }

    setReminder = (reminder) => {
        this.setState({
            reminder: reminder
        })
        this.setShowModal(true);
    }

    render() {
        const { showing } = this.state;
        return (
            <div className="Reminder">
                <h1>Hello {this.state.name}</h1>
                <br></br><br></br>
                <p><h1>{this.weekDay}</h1></p>
                <h1>{this.monthStr[this.month]} {this.day}, {this.year}</h1>
                <br></br>
                <h3>Reminders:</h3>
                <table id="reminder-list">
                    <col span="1" style={{width: "90%"}}/>
                    <col span="1" style={{width: "10%"}}/>
                    {this.state.reminders.map((reminder) => 
                        <tr key={reminder.rem_id}>
                            <td>{reminder.event_name}</td>
                            <td><button type="button" class="btn btn-primary btn-sm" onClick={() => this.setReminder(reminder)}>Edit</button></td>
                        </tr>
                    )}
                </table>

                <button type="button" class="btn btn-primary btn-sm" onClick={() => this.setReminder(null)}>Add</button>
                
                <ReminderModal
                    key={this.state.showModal}
                    {...this.state.reminder}
                    setShowModal={this.setShowModal}
                    showModal={this.state.showModal}
                    year={this.year}
                    month={this.month}
                    day={this.day}
                />
                
            </div>
            
        )
    }
}



export default Reminder
