import React, { Component } from 'react'
import './Navbar.css'
import LoginButton from './LoginButton'

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <div className='Title'><h1>MyScheduler</h1></div>
                <LoginButton />
            </div>
        )
    }
}

export default Navbar
