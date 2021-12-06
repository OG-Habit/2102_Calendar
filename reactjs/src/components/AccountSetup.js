import React, { useState } from 'react';
import LoginSignup from './LoginSignup';
import ButtonLS from './ButtonLS';
import Text from './Text';

function AccountSetup() {
  const [mode, setMode] = useState("login");

  const changeToLogin = () => setMode("login");

  const changeToSignup = () => setMode("signup");

  return (
    <div>
      <div className="accsetup-bg"></div>
      <main className="accsetup">
        <Text />
        <section className="ls-cont">
          <ButtonLS mode={mode} changeToLogin={changeToLogin} changeToSignup = {changeToSignup} />
          <LoginSignup mode={mode} setMode={setMode} />
        </section>
      </main> 
    </div>
  );
}

export default AccountSetup;