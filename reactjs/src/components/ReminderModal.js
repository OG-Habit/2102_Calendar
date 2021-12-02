import React, { Component } from 'react'

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
        this.reminder = props.reminder;
        this.year = props.year;
        this.month = props.month;
        this.day = props.day;
    }
    
    closeModal = () => {
        this.props.setShowModal(false);
    }

    componentDidMount() {
        console.log(this.reminder)
    }

    render() {
        return (
            <div class="container" id="container" style={{ display: (this.showModal ? 'block' : 'none') }}>
                <label for="show" class="close" onClick={this.closeModal}>x</label>
                <div class="text">
                    {this.monthStr[this.month]} {this.day}, {this.year}
                </div>
                <form action ="" id = "form" onsubmit="" method = "POST">
                    <div class="data">
                        <label>Reminder:</label>
                        <input type="text" name="eventName" id="eventName" defaultValue={this.props.event_name} require/>
                    </div>
                    <div class="data">
                        <label>Description</label>
                        <textarea type="text" name="descript" id="descript" defaultValue={this.props.descript} require/>
                    </div>
                    <div class="data-time">
                        <label>Time Start</label>
                        <input type="time" name="timeStart"/>
                    </div>
                    <div class="data-time">
                        <label>Time End</label>
                        <input type="time" name="timeEnd"/>
                    </div>
                        <input type="text" hidden name= "id" id="id" require/>                                <input hidden name="edit-id" id="edit-id"/>
                    <div class="btn">
                        <input type="submit" name="btn" id="btn" value="Add"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default  ReminderModal
