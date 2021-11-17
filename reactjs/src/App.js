import React, { useState } from 'react';
import AccountSetup from '../src/components/AccountSetup';
import ButtonLS from './components/ButtonLS';
// import MyCalendar from './components/MyCalendar';

function App() {
  const [mode, setMode] = useState("login");

  const changeToLogin = () => setMode("login");

  const changeToSignup = () => setMode("signup");

  return (
    <main>
      <section className="ls-cont">
        <ButtonLS mode={mode} changeToLogin={changeToLogin} changeToSignup = {changeToSignup} />
        <AccountSetup mode={mode} setMode={setMode} />
      </section>
    </main>
  );
}

export default App;
