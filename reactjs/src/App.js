import './App.css';
import MyCalendar from './components/MyCalendar.js';
import Reminder from './components/Reminder.js';
import React, { useState } from 'react';
import MyCalendar from './components/MyCalendar';

function App() {
  return (
    <div className="App">
        <Reminder />
        <MyCalendar />
    </div>
  );
}

export default App;