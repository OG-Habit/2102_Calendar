import React, { Component } from 'react'
import {Accordion} from 'react-bootstrap'
import './ReminderItem.css'

export default class ReminderItem extends Component {
    constructor(props){
        super(props);
        this.reminder = props.reminder;
        this.remId = props.reminder.rem_id;
        this.eventName = props.reminder.event_name;
        this.descript = props.reminder.descript;
        this.timeStart = props.reminder.time_start;
        this.timeEnd = props.reminder.time_end;
    }

    

    convertTime = (time) => {
        let currTime = time.split(":"), abbr;
        if(currTime[0] > 12){
            currTime[0] -= 12;
            currTime[0] = currTime[0].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            abbr = "PM";
        }
        else {
            abbr = "AM";
        }
        return `${currTime[0]}:${currTime[1]} ${abbr}`;
      }

    render() {
        let {reminder, remId, eventName, descript, timeStart, timeEnd} = this;
        timeStart = this.convertTime(timeStart);
        timeEnd = this.convertTime(timeEnd);
        return (
            <div className="row">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className="col-sm-8">
                                <p>{eventName}</p>
                                <p>{timeStart} - {timeEnd}</p>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => this.props.setModalValues(reminder, "Edit")}>
                                    Edit
                                </button>
                            </div>
                            <div className="col-sm-2">
                                <button data-key={remId} type="button" className="btn btn-danger btn-sm" onClick={this.props.delete}>
                                    Delete
                                </button>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {descript}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        )
    }
}
