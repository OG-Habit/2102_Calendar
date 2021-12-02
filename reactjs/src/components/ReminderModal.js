import React, { Component } from 'react'
import $ from 'jquery';
import Axios from 'axios'

class ReminderModal extends Component {
    constructor(props){
        super(props);
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
        this.showModal = props.showModal;
        this.year = props.year;
        this.month = props.month;
        this.day = props.day;
        this.mode = props.mode;
        this.id = props.id;
    }
    
    closeModal = () => {
        this.props.setShowModal(false);
    }

    handleForm = () => {
        if(this.mode === "add"){
            this.createReminder();
            console.log("add");
        }
        else if(this.mode === "update"){
            this.updateReminder();
            console.log("update");
        }
        this.closeModal();
    }

    createReminder = () => {
        let value = $('#form').serializeArray(),
        obj = {};
        $(value).each(function(i, field){
            obj[field.name] = field.value;
        });
        let data = {
            user_id: this.id,
            event_name: obj["eventName"],
            descript: obj["descript"],
            year: this.year,
            month: this.month,
            day: this.day,
            time_start: obj["timeStart"],
            time_end: obj["timeEnd"]
        }
        console.log(data);
        Axios.post(require('../config/reminder'), data)
        .then((res) => {
            console.log(res);
            alert(res.data.message);
            this.props.load();
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    updateReminder = () => {
        let value = $('#form').serializeArray(),
        obj = {};
        $(value).each(function(i, field){
            obj[field.name] = field.value;
        });
        let data = {
            user_id: this.id,
            event_name: obj["eventName"],
            descript: obj["descript"],
            year: this.year,
            month: this.month,
            day: this.day,
            time_start: obj["timeStart"],
            time_end: obj["timeEnd"]
        }
        Axios.post(require('../config/reminder') + `/${this.props.rem_id}`, data)
        .then((res) => {
            console.log(res);
            alert(res.data.message);
            this.props.load();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        const {event_name, descript, time_start, time_end} = this.props;
        return (
            <div className="container" id="container" style={{ display: (this.showModal ? 'block' : 'none') }}>
                <label for="show" className="close" onClick={this.closeModal}>x</label>
                <div className="text">
                    {this.monthStr[this.month]} {this.day}, {this.year}
                </div>
                <form onSubmit={this.handleForm} id = "form">
                    <div className="data">
                        <label>Reminder:</label>
                        <input type="text" name="eventName" id="eventName" defaultValue={event_name} required/>
                    </div>
                    <div className="data">
                        <label>Description</label>
                        <textarea type="text" name="descript" id="descript" defaultValue={descript} required/>
                    </div>
                    <div className="data-time">
                        <label>Time Start</label>
                        <input type="time" name="timeStart" defaultValue={time_start} required/>
                    </div>
                    <div className="data-time">
                        <label>Time End</label>
                        <input type="time" name="timeEnd" defaultValue={time_end} required/>
                    </div>
                    <div className="btn">
                        <button type="submit">{this.mode}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default  ReminderModal
