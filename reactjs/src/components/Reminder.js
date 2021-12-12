import React, { Component } from "react";
import "./Reminder.css";
import ReminderModal from "./ReminderModal";
import Axios from "axios";
import ReminderItem from "./ReminderItem";
import UserProfile from './UserProfile'
import icon1 from "../img/icon1.png";
import icon2 from "../img/icon2.png";
import icon3 from "../img/icon3.png";
import icon4 from "../img/icon4.png";
import icon5 from "../img/icon5.png";
import icon6 from "../img/icon6.png";
import icon7 from "../img/icon7.png";
import icon8 from "../img/icon8.png";

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
    this.icons = [
      icon1,
      icon2,
      icon3,
      icon4,
      icon5,
      icon6,
      icon7,
      icon8
    ]
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

  deleteReminder = (e) => {
    let val = window.confirm("Would you like to delete?");
    if(val){
      let value = e.target.getAttribute("data-key");
      Axios.post(require("../config/reminder") + "/delete/" + value).then(
        (res) => {
          alert(res.data.message);
          this.props.loadReminders();
        }
      );
    }
  };

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
                        delete={this.deleteReminder}
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
      </div>
    );
  }
}

export default Reminder;
