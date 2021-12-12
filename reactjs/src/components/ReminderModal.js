import React, { Component } from 'react'
import $ from 'jquery';
import Axios from 'axios'
import './ReminderModal.css'

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
        if(this.mode === "Add"){
            this.createReminder();
        }
        else if(this.mode === "Edit"){
            this.updateReminder();
        }
        // this.closeModal();
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
        Axios.post(require('../config/reminder'), data)
        .then((res) => {
            alert(res.data.message);
            if(res.data.status === 200){
                // this.props.load();
            }
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
            alert(res.data.message);
            if(res.data.status === 200){
                // this.props.load();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        const {event_name, descript, time_start, time_end} = this.props;
        return (
            <div className="container-modal" style={{ display: (this.showModal ? 'block' : 'none') }}>
                <label className="close" onClick={this.closeModal}><i className="fas fa-times"/></label>
                <div className="text">
                    {this.monthStr[this.month]} {this.day}, {this.year}
                </div>
                <form onSubmit={this.handleForm} id = "form">
                    <div className="form-group mb-2">
                        <label className="mb-1">Reminder</label>
                        <input type="text" name="eventName" className="form-control" defaultValue={event_name} required/>
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Description</label>
                        <textarea type="text" name="descript" rows="6" className="form-control" defaultValue={descript} required/>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label className="mb-1">Time Start</label>
                            <input type="time" name="timeStart" className="form-control" defaultValue={time_start} required/>
                        </div>   
                        <div className="col">
                            <label className="mb-1">Time End</label>
                            <input type="time" name="timeEnd" className="form-control" defaultValue={time_end} required/>
                        </div>
                    </div>
                    <div className="flex-row mt-3">
                        <button type="submit" className="btn btn-primary col">{this.mode}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default  ReminderModal
