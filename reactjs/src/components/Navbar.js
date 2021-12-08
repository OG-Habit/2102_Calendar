import React, { Component } from 'react'
import './Navbar.css'
import LogoutButton from './LogoutButton'
import ShowReminders from './ShowReminders'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="Navbar align-items-center">
                <div className="col-sm-2 align-self-center">
                    <h1 class = "Navbar-title">MyCalendar</h1>
                </div>
                <div className="col-sm-2 align-self-center">
                    <ShowReminders toggleCalendar={this.props.toggleCalendar} btntext={this.props.btntext} />
                </div>
                <div className="col-sm-2 align-self-center offset-5">
                    <LogoutButton />
                </div>
            </div>
        )
    }
}

export default Navbar
