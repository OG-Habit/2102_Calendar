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
        this.name=props.name;
        this.userId=props.userId;
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
            mode: "",
            reminders: [],
            reminder: null,
            id: null,
        }
    }

    setReminder=(event)=>{
        this.setState({reminder:event.target.value})   
    }

    displayReminder=()=>{
        alert(this.state.reminders)
    }
    
    

    componentDidMount() {
        let values = `/${this.userId}-${this.year}-${this.month}-${this.day}`
        Axios
        .get(require('../config/reminder') + '/date' + values)
        .then((res) => {
            let data = res.data.data;
            this.setState({
                reminders: data,
            })
        })
    }

    setShowModal = (value) => {
        this.setState({
            showModal: value
        })
    }

    setModalValues = (reminder, mode) => {
        this.setState({
            reminder: reminder,
            mode: mode
        })
        this.setShowModal(true);
    }

    deleteReminder = (e) => {
        let value = e.target.getAttribute("data-key");
        Axios
        .post(require('../config/reminder') + '/delete/' + value)
        .then((res) => {
            console.log(res);
            alert(res.data.message);
            this.props.load();
        })
    }

    render() {
        const { showing } = this.state;
        return (
            <div className="Reminder">
                <h1>Hello {this.name}</h1>
                <br></br><br></br>
                <p><h1>{this.weekDay}</h1></p>
                <h1>{this.monthStr[this.month]} {this.day}, {this.year}</h1>
                <br></br>
                <h3>Reminders:</h3>
                <table id="reminder-list">
                    <col span="1" style={{width: "80%"}}/>
                    <col span="1" style={{width: "10%"}}/>
                    <col span="1" style={{width: "10%"}}/>
                    {this.state.loading ? <span>Loading in...</span> : this.state.reminders.map((reminder) => 
                        <tr key={reminder.rem_id}>
                            <td>{reminder.event_name}</td>
                            <td><button type="button" class="btn btn-primary btn-sm" onClick={() => this.setModalValues(reminder, "update")}>Edit</button></td>
                            <td><button data-key={reminder.rem_id} type="button" class="btn btn-primary btn-sm" onClick={this.deleteReminder}>Delete</button></td>
                        </tr>
                    )}
                </table>

                <button type="button" class="btn btn-primary btn-sm" onClick={() => this.setModalValues(null, "add")}>Add</button>
                
                <ReminderModal
                    key={this.state.showModal}
                    {...this.state.reminder}
                    setShowModal={this.setShowModal}
                    showModal={this.state.showModal}
                    mode={this.state.mode}
                    year={this.year}
                    month={this.month}
                    day={this.day}
                    id={this.userId}
                    load={this.props.load}
                />
                
            </div>
            
        )
    }
}



export default Reminder
