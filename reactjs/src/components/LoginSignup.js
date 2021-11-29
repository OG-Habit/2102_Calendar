import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import $ from 'jquery';

const LoginSignup = ({mode, setMode}) => {
    let formJsx, loginForm, signupForm;
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    loginForm = "loginForm";
    signupForm = "signupForm";

    Axios.defaults.withCredentials = true;

    const login = (e) => {
      let data = $(`#${loginForm}`).serializeArray();
      let url = require("../config/login");
      let values = "", msg;
      data.forEach((elem) => {
        values = values.concat(elem["value"], "-");
      })
      values = values.slice(0, -1);
      $.ajax({
        type: "GET",
        url: url + "/" + values,
        xhrFields: {
         withCredentials: true
        },
        success: function(res) {
          console.log(res);
          let data = res.data;
          msg = res.valid ?
            `Welcome back ${data.firstname}` :
            `Invalid email or password.`;
          alert(msg);
          setLoggedIn(true);
        }
      })
      e.preventDefault()
    }

    const signup = (e) => {
      let data = $(`#${signupForm}`).serialize();
      let url = require("../config/signup");
      $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/x-www-form-urlencoded",
        success: function(res) {
          alert(res["message"]);
          setMode("login");
        }
      })
      e.preventDefault();
    }

    if(mode === "login") {
      formJsx = (
        <form key={loginForm} action="" id={loginForm}>
          <input type="text" placeholder="Email" name="email" autoFocus/>
          <input type="password" placeholder="Password" name="password"/>
          <button onClick={login} className="ls-cont__btn">Login</button>
        </form>
      );
    }

    if(mode === "signup") {
      formJsx = (
        <form key={signupForm} action="" id={signupForm}>
          <input type="text" placeholder="First Name" name="fname" autoFocus/>
          <input type="text" placeholder="Last Name" name="lname" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button onClick={signup} className="ls-cont__btn">Sign up</button>
        </form>
      );
    }

    useEffect(() => {
      const checkLoggedInUser = () => {
        Axios.get("http://localhost:3000/accsetup").then((res) => {
          let data = res.data;
          if(data.loggedIn)
            navigate(`/${data.id}`);
        })
      }
      checkLoggedInUser();
    }, [loggedIn]);

    return formJsx;
}

export default LoginSignup;