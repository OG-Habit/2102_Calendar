import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import $ from 'jquery';

const LoginSignup = ({mode, setMode}) => {
    let formJsx, loginForm, signupForm;
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const {
        register, 
        handleSubmit,
        reset
    } = useForm({
      mode: "onChange",
      defaultValues: {
        fname: ""
      }
    });

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
        // http://localhost:3000/accsetup/login/ivan@gmail.com-ivan
        data: data,
        xhrFields: {
         withCredentials: true
        },
        success: function(res) {
          let data = res.data;
          msg = res.valid ?
            `Welcome back ${data.firstname}` :
            `Invalid email or password.`;
          alert(msg);
          setLoggedIn(true);
        }
      })
    }

    const signup = (data) => {
      let url = require("../config/signup");
      $.ajax({
        type: "POST",
        url: url,
        // http://localhost:3000/accsetup/signup
        data: data,
        contentType: "application/x-www-form-urlencoded",
        success: res => {
          let {success, message} = res;
          alert(message);
          if(success) {
            setMode("login");
            reset({
              fname: "",
              lname: "",
              email: "",
              password: ""
            })
          } else {
            $("#email").trigger("focus");
            reset({
              fname: $("#fname").val(),
              lname: $("#lname").val(),
              email: "",
              password: ""
            })
          }
        }
      })
    }

    const onInvalidInputs = (errors, e) => {
      console.log(errors);
      if(!errors.email || errors.email.message === "") {
        alert("Please input in all fields");
      } else { 
        alert(errors.email.message);
      }
    }

    if(mode === "login") {  
      formJsx = (
        <form key={loginForm} id={loginForm} onSubmit={handleSubmit(login, onInvalidInputs)}>
          <input type="email" placeholder="Email" autoFocus {...register("email", {
            required: true,
            pattern: {
              message: "Invalid email format!",
              value: emailRegEx
            }
          })} />
          <input type="password" placeholder="Password" {...register("password", {required: true})}/>
          <button type='submit' className="ls-cont__btn">Login</button>
        </form>
      );
    }

    if(mode === "signup") {
      formJsx = (
        <form key={signupForm} onSubmit={handleSubmit(signup, onInvalidInputs)} id={signupForm}>
          <input type="text" placeholder="First Name" id="fname" autoFocus  {...register("fname", {required: true})} />
          <input type="text" placeholder="Last Name" id="lname" {...register("lname", {required: true})} />
          <input type="email" placeholder="Email" id="email" {...register("email", {
            required: true,
            pattern: {
              message: "Invalid email format!",
              value: emailRegEx
            }
          })}/>
          <input type="password" placeholder="Password" id="password" {...register("password", {required: true})}/> 
          <button type='submit' className="ls-cont__btn">Sign up</button>
        </form>
      );
    }

    useEffect(() => {
      Axios.get("http://localhost:3000/accsetup").then((res) => {
        let data = res.data;
        if(data.loggedIn)
          navigate(`/${data.id}`);
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return formJsx;
}

export default LoginSignup;