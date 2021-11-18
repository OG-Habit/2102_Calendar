import './App.css';
import MyCalendar from './components/MyCalendar.js';
import Navbar from './components/Navbar';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
        <Navbar />
        <MyCalendar />
    </div>
  );
}

export default App;