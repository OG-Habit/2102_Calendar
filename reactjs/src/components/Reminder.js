import React, { Component } from "react";
import "./Reminder.css";
import ReminderModal from "./ReminderModal";
import Axios from "axios";
import ReminderItem from "./ReminderItem";
import UserProfile from './UserProfile'

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
      "SUN",
      "MON",
      "TUE",
      "WED",
      "THU",
      "FRI",
      "SAT",
    ];
    this.state = {
      showModal: false,
      showUser: false,
      mode: "",
      reminders: [],
      reminder: null,
      id: null,
    };
  }

  componentDidMount() {
    this.getReminder();
  }

  setShowModal = (show) => {
    this.setState({
      showModal: show,
    });
  };

  setModalValues = (reminder, mode) => {
    this.setState({
      reminder: reminder,
      mode: mode,
    });
    this.setShowModal(true);
  };

  setShowUser = (show) => {
    this.setState({
      showUser: show,
    });
  }

  getReminder = () => {
    let values = `/${this.userId}-${this.year}-${this.month}-${this.day}`;
    Axios.get(require("../config/reminder") + "/date" + values).then((res) => {
      let data = res.data.data;
      this.setState({
        reminders: data,
      });
    });
  }

  render() {
    this.calendarClass = this.props.calendar ? "" : "hide";
    return (
      <div className="Reminder">
        <center>
          <img src={require(`../img/${this.props.icon}.png`).default} alt="avatar.png" onClick={() => this.setShowUser(true)} className="avatar-btn"></img>
          <p className="reminder-info-heading">{this.name}</p>
        
        <p className="reminder-info-heading">
        {this.monthStr[this.month]} {this.day}, {this.year} {this.dayStr[this.weekDay]} 
        </p>
        </center>
        <div className={`box ${this.calendarClass}`}>
          <div className="reminder-header-box">
            <p className="reminder-header col-9">Reminders</p>
            <div className="col-3">
              <button type="button" className="btn btn-success btn-sm w-100" onClick={() => this.setModalValues(null, "Add")}>Add</button>
            </div>
          </div>
            
            <div className="reminder-cont">          
                <div id="reminder-list">
                    {this.state.reminders.map((reminder) => (
                        <ReminderItem
                        key={reminder.rem_id}
                        reminder={reminder}
                        setModalValues={this.setModalValues}
                        load={this.props.loadReminders}
                        />
                    ))
                    }
                </div>
            </div>
        </div>
        <ReminderModal
          key={`${this.state.showModal}-modal`}
          {...this.state.reminder}
          setShowModal={this.setShowModal}
          showModal={this.state.showModal}
          mode={this.state.mode}
          year={this.year}
          month={this.month}
          day={this.day}
          id={this.userId}
          load={this.props.loadReminders}
        />
        <UserProfile
          key={`${this.state.showUser}-user`}
          userId={this.userId}
          show={this.state.showUser}
          setShow={this.setShowUser}
          load={this.props.loadName}
        />
        <center>
          <div className="icon-con">
            <i className="fab fa-facebook-square"></i>
          </div>
          <div className="icon-con">
            <i className="fab fa-twitter-square"></i>
          </div>
          <div className="icon-con">
            <i className="fab fa-linkedin-square"></i>   
          </div>
          <br/>
          <small style={{color: "white"}}>&copy; Copyright 2021, Group 3</small>
        </center>
      </div>
    );
  }
}

export default Reminder;
