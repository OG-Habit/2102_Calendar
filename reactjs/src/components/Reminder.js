import React, { Component } from "react";
import "./Reminder.css";
import ReminderModal from "./ReminderModal";
import Axios from "axios";
import ReminderItem from "./ReminderItem";
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
    this.getReminder();
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
    let val = window.confirm("Would you like to delete?");
    if(val){
      let value = e.target.getAttribute("data-key");
      Axios.post(require("../config/reminder") + "/delete/" + value).then(
        (res) => {
          console.log(res);
          alert(res.data.message);
          this.props.load();
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
          <img src={icon1} alt="avatar.png"></img>
          <h4>{this.name}</h4>
        </center>
        <h1>
        {this.dayStr[this.weekDay]},<br/>{this.monthStr[this.month]} {this.day}, {this.year}
        </h1>
        <br></br>
        <div className={`box ${this.calendarClass}`}>
          <div className="reminder-header-box">
            <h3 className="reminder-header col-sm-9">Reminders</h3>
            <div className="col-sm-3">
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

        <div class="profile-container">
          <label for="show" class="close" onClick="hide()">x</label>
          <center>
          <div class="avatar-profile">
            <img src={icon1} alt="avatar.png"></img>
            <br/>
            <button class="edit-avatar-btn">Change Avatar Picture</button>
          </div>
          </center>
          <div class="profile-form-container">
            <div>
              <div class="data"><label>First Name:</label></div>
              <div class="data"><label>Last Name:</label></div>
              <div class="data"><label>Password:</label></div>
            </div>
            <form>
              <div class="data"><input type="text" name="firstName" id="firstName" required/></div>
              <div class="data"><input type="text" name="lastName" id="lastName" required/></div>
              <div class="data"><input type="password" name="password" id="password" required/></div>  
            </form>
          </div>
            <div class="avatar-pick-grid">
            <img src={icon1} alt="avatar1.png"></img>
            <img src={icon2} alt="avatar2.png"></img>
            <img src={icon3} alt="avatar3.png"></img>
            <img src={icon4} alt="avatar4.png"></img>
            <img src={icon5} alt="avatar5.png"></img>
            <img src={icon6} alt="avatar6.png"></img>
            <img src={icon7} alt="avatar7.png"></img>
            <img src={icon8} alt="avatar8.png"></img>
          </div>
          <button type="button" className="btn btn-success btn-sm w-80" id="apply-profile-btn">Apply Changes</button>
        </div>        
      </div>
    );
  }
}

export default Reminder;
