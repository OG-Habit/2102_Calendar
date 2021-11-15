import './App.css';
import MyCalendar from './components/MyCalendar.js';
import Reminder from './components/Reminder.js';
import React, { useState } from 'react';
import AccountSetup from '../src/components/AccountSetup';
import ButtonLS from './components/ButtonLS';

function App() {
  const [mode, setMode] = useState("login");

  const changeToLogin = () => setMode("login");

  const changeToSignup = () => setMode("signup");

  return (
    <main>
      <section className="ls-cont" style={{display:'none' /* ako sa gi display none*/}}>
        <ButtonLS mode={mode} changeToLogin={changeToLogin} changeToSignup = {changeToSignup} />
        <AccountSetup mode={mode} />
      </section>
      {/* idk where to put this */}
      <div className="App">
        <Reminder />
        <MyCalendar />
      </div>
    </main>
  );
}

export default App;
