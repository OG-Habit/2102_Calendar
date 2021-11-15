import React from 'react';

const AccountSetup = ({mode}) => {
    let formJsx;

    if(mode === "login") {
      formJsx = (
        <form action="" id="loginForm">
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button className="ls-cont__btn">Login</button>
        </form>
      );
    }

    if(mode === "signup") {
      formJsx = (
        <form action="" id="signupForm">
          <input type="text" placeholder="First Name" name="fname" />
          <input type="text" placeholder="Last Name" name="lname" />
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button className="ls-cont__btn">Sign up</button>
        </form>
      );
    }

    return formJsx;
}

export default AccountSetup;