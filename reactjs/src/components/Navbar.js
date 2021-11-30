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
            <div className='Navbar'>
                <div className='Title'>
                    <h1>MyScheduler</h1>
                    <ShowReminders toggleCalendar={this.props.toggleCalendar} btntext={this.props.btntext} />
                </div>
                <LogoutButton />
            </div>
        )
    }
}

export default Navbar
