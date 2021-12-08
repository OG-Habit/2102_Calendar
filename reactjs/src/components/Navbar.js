import React, { Component } from 'react'
import './Navbar.css'
import LogoutButton from './LogoutButton'
import ShowReminders from './ShowReminders'
import logo from "../img/logo.png";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="Navbar align-items-center">
                <div className="col-sm-0 align-self-center ">
                    <img src={logo} alt="logo.png" />
                </div>
                <div className="col-sm-2 align-self-center">
                    <ShowReminders toggleCalendar={this.props.toggleCalendar} btntext={this.props.btntext} />
                </div>
                <div className="col-sm-2 align-self-center offset-8">
                    <LogoutButton />
                </div>
            </div>
        )
    }
}

export default Navbar
