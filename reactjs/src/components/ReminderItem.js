import React, { Component } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import ReminderToggle from './ReminderToggle'

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
        return `${currTime[0]}:${currTime[1]}${abbr}`;
    }

    render() {
        let {reminder, remId, eventName, descript, timeStart, timeEnd} = this;
        timeStart = this.convertTime(timeStart);
        timeEnd = this.convertTime(timeEnd);
        return (
            <div>
                <Accordion>
                    <Card>
                        <Card.Header className="row">
                            <div className="col" style={{width: "0px"}}>
                                <p>{eventName}</p>
                                <p>{timeStart}-{timeEnd}</p>
                            </div>
                            <div className="col row">
                                <div className="col-sm-4 button-padding">
                                    <ReminderToggle eventKey="0"><i className="fas fa-eye"></i></ReminderToggle>
                                </div>
                                <div className="col-sm-4 button-padding">
                                    <button type="button" className="btn btn-primary btn-sm w-100 mb-1" onClick={() => this.props.setModalValues(reminder, "Edit")}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </div>
                                <div className="col-sm-4 button-padding">
                                    <button data-key={remId} type="button" className="btn btn-danger btn-sm w-100 mb-1" onClick={this.props.delete}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0" style={{width: "330px"}}>
                            <Card.Body>{descript}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}
