import './App.css';
import MyCalendar from './components/MyCalendar.js';
import Reminder from './components/Reminder.js';
import React from 'react';

function App() {
  return (
    <div className="App">
        <Navbar />
        <MyCalendar />
    </div>
  );
}

export default App;