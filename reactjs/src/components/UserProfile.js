import React, { Component } from 'react'
import icon1 from "../img/icon1.png"
import icon2 from "../img/icon2.png"
import icon3 from "../img/icon3.png"
import icon4 from "../img/icon4.png"
import icon5 from "../img/icon5.png"
import icon6 from "../img/icon6.png"
import icon7 from "../img/icon7.png"
import icon8 from "../img/icon8.png"
import { Spinner } from 'react-bootstrap'
import Axios from 'axios'
import $ from 'jquery'
import './UserProfile.css'

export default class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            loadUser: true,
            mode: 0,
            changePass: 0,
            icon: 'icon1',
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        Axios
        .get(`http://localhost:3000/accsetup/getuser/${this.props.userId}`)
        .then((res) => {
            let {data} = res.data;
            this.setState({
                user: data,
                icon: data.icon,
                loadUser: false
            }) 
        })
        .catch((err) => {
            console.log(err);
        })
    }

    updateUser = () => {
        let value = $('#userform').serializeArray(),
        obj = {},
        valid = true;
        $(value).each(function(i, field){
            obj[field.name] = field.value;
        });

        if(this.state.changePass){
            if(obj["old-password"] !== this.state.user.password) {
                alert("Incorrect old password");
                valid = false;
            }
        }
        else {
            obj["new-password"] = this.state.user.password;
        }

        if(valid) {
            let data = {
                fname: obj["firstName"],
                lname: obj["lastName"],
                password: obj["new-password"],
                icon: this.state.icon,
            }
            Axios.post(require('../config/profile') + `/${this.props.userId}`, data)
            .then((res) => {
                alert(res.data.message);
                if(res.data.status === 200){
                    this.props.load();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    setMode = () => {
        this.setState({
            mode: (this.state.mode+1)%2
        })
    }

    setIcon = (icon) => {
        this.setState({
            icon: icon
        })
        this.setMode();
    }

    setChangePass = () => {
        this.setState({
            changePass: (this.state.changePass+1)%2
        })
    }

    render() {
        return this.state.loadUser ?
        (
        <div className="profile-container" style={{display: this.props.show ? 'display' : 'none'}}>
            <div className="row justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
        ) : (
        <div className="profile-container" style={{display: this.props.show ? 'display' : 'none'}}>
          <button className="close" onClick={() => this.props.setShow(false)}>x</button>
          <center>
          <div className="avatar-profile">
              <button className="avatar-button" onClick={this.setMode}>
                <img src={require(`../img/${this.state.icon}.png`).default} alt="avatar.png"></img>
              </button>
            <br/>
          </div>
          </center>
          <form onSubmit={this.updateUser} id="userform">
            <div className="profile-form-container" style={{display: this.state.mode === 0 ? 'block' : 'none'}}>
                <div className="row mb-3">
                    <label className="col-sm-3">First Name:</label>
                    <input type="text" name="firstName" className="form-control col"
                    defaultValue={this.state.user.firstname} required/>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-3">Last Name:</label>
                    <input type="text" name="lastName" className="form-control col"
                    defaultValue={this.state.user.lastname} required/>
                    
                </div>
                <div className="row mb-2">
                    <label className="col-sm-3">Old Password:</label>
                    <div className="col-sm-5 align-self-start">
                        <input type="password" name="old-password" className="form-control col"
                        readOnly={!this.state.changePass ? true : false} required/>
                    </div>
                    <div className="form-check col-sm-4">
                        <input class="form-check-input" type="checkbox" onClick={this.setChangePass}/>
                        <label class="form-check-label">
                            Change Password
                        </label>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-3">New Password:</label>
                    
                    <div className="col-sm-5 align-self-start">
                        <input type="password" name="new-password" className="form-control"
                        readOnly={!this.state.changePass ? true : false} required/>
                    </div>
                </div>
            </div>
            <div className="avatar-pick-grid" style={{display: this.state.mode === 1 ? 'block' : 'none'}}>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon1')}>
                    <img src={icon1} alt="avatar1.png"></img>
                </button>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon2')}>
                    <img src={icon2} alt="avatar2.png"></img>
                </button>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon3')}>
                    <img src={icon3} alt="avatar3.png"></img>
                </button>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon4')}>
                    <img src={icon4} alt="avatar4.png"></img>
                </button>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon5')}>
                    <img src={icon5} alt="avatar5.png"></img>
                </button>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon6')}>
                    <img src={icon6} alt="avatar6.png"></img>
                </button>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon7')}>
                    <img src={icon7} alt="avatar7.png"></img>
                </button>
                <button type="button" className="avatar-button" onClick={() => this.setIcon('icon8')}>
                    <img src={icon8} alt="avatar8.png"></img>
                </button>
            </div>
            <button type="submit" className="btn btn-success btn-sm" id="apply-profile-btn">Apply Changes</button>
          </form>
        </div>
        )
    }
}
