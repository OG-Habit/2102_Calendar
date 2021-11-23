import './App.css';
import Scheduler from './components/Scheduler';
import Navbar from './components/Navbar';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Scheduler />
    </div>
  );
}

export default App;