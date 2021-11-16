import React from 'react';
import $ from 'jquery';

const AccountSetup = ({mode, setMode}) => {
    let formJsx, loginForm, signupForm;
    const xhttp = new XMLHttpRequest();

    loginForm = "loginForm";
    signupForm = "signupForm";

    const login = (e) => {
      let data = $(`#${loginForm}`).serialize();
      let url = require("../config/login");
      xhttp.open("GET", url, true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(data);
      xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
          let res = JSON.parse(this.responseText);
          console.log(res);
        }
      }
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
          <input type="text" placeholder="Password" name="password"/>
          <button onClick={login} className="ls-cont__btn">Login</button>
        </form>
      );
    }

    if(mode === "signup") {
      formJsx = (
        <form key={signupForm} action="" id={signupForm}>
          <input type="text" placeholder="First Name" name="fname" autoFocus/>
          <input type="text" placeholder="Last Name" name="lname" />
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button onClick={signup} className="ls-cont__btn">Sign up</button>
        </form>
      );
    }

    return formJsx;
}

export default AccountSetup;