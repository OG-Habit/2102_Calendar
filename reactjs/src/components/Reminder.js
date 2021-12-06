import React, { Component } from "react";
import "./Reminder.css";
import ReminderModal from "./ReminderModal";
import Axios from "axios";
import {Accordion} from 'react-bootstrap'

class Reminder extends Component {
  constructor(props) {
    super(props);
    this.day = props.selectedDate.getDate();
    this.month = props.selectedDate.getMonth();
    this.year = props.selectedDate.getFullYear();
    this.weekDay = props.selectedDate.getDay();
    this.name = props.name;
    this.userId = props.userId;
    this.monthStr = [
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
      "Dec.",
    ];
    this.dayStr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.state = {
      showModal: false,
      mode: "",
      reminders: [],
      reminder: null,
      id: null,
    };
  }

  componentDidMount() {
    let values = `/${this.userId}-${this.year}-${this.month}-${this.day}`;
    Axios.get(require("../config/reminder") + "/date" + values).then((res) => {
      let data = res.data.data;
      this.setState({
        reminders: data,
      });
    });
  }

  setShowModal = (value) => {
    this.setState({
      showModal: value,
    });
  };

  setModalValues = (reminder, mode) => {
    this.setState({
      reminder: reminder,
      mode: mode,
    });
    this.setShowModal(true);
  };

  deleteReminder = (e) => {
    let value = e.target.getAttribute("data-key");
    Axios.post(require("../config/reminder") + "/delete/" + value).then(
      (res) => {
        console.log(res);
        alert(res.data.message);
        this.props.load();
      }
    );
  };

  render() {
    return (
      <div className="Reminder">
        <h1>Hello {this.name}</h1>

        <h1>{this.dayStr[this.weekDay]}</h1>
        <h1>
          {this.monthStr[this.month]} {this.day}, {this.year}
        </h1>
        <br></br>
        <div className="box">
            <h3 class="reminder-header">Reminders:</h3>
            <div class="reminder-cont">          
                <div id="reminder-list">
                    {this.state.reminders.map((reminder) => (
                        
                        <div className="row" key={reminder.rem_id}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className="col-sm-4">
                                        <p>{reminder.event_name}</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>{reminder.time_start}-{reminder.time_end}</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.setModalValues(reminder, "update")}>Edit</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button data-key={reminder.rem_id} type="button" className="btn btn-primary btn-sm" onClick={this.deleteReminder}>
                                            Delete
                                        </button>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {reminder.descript}
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>
                        </div>
                        
                    ))
                    }
                </div>
            </div>
        </div>
        <button type="button" className="btn btn-primary btn-lg" onClick={() => this.setModalValues(null, "add")}>Add</button>
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
    );
  }
}

export default Reminder;
