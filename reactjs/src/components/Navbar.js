import React, { Component } from 'react'
import './Navbar.css'
import LogoutButton from './LogoutButton'

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <div className='Title'><h1>MyScheduler</h1></div>
                <LogoutButton />
            </div>
        )
    }
}

export default Navbar
