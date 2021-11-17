import React, { useState } from 'react';
import LoginSignup from './LoginSignup';
import ButtonLS from './ButtonLSButtonLS';

function AccountSetup() {
  const [mode, setMode] = useState("login");

  const changeToLogin = () => setMode("login");

  const changeToSignup = () => setMode("signup");

  return (
    <main>
      <section className="ls-cont">
        <ButtonLS mode={mode} changeToLogin={changeToLogin} changeToSignup = {changeToSignup} />
        <LoginSignup mode={mode} setMode={setMode} />
      </section>
    </main>
  );
}

export default AccountSetup;