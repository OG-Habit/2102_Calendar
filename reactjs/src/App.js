import './App.css';
import Scheduler from './components/Scheduler';
import Navbar from './components/Navbar';
import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Axios from 'axios';

const text1 = "Show My Reminders";
const text2 = "Show My Calendar";

function App() {
  const [calendar, setCalendar] = useState(true);
  const [btntext, setBtntext] = useState(text1)
  const params = useParams();
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  // const toggleCalendar = () => setCalendar(!calendar);
  const toggleCalendar = () => {
    setCalendar(!calendar);
    if(btntext === text1)
      setBtntext(text2);
    else 
      setBtntext(text1);
  }

  useEffect(() => {
    Axios.get("http://localhost:3000/accsetup").then((res) => {
      if(!res.data.loggedIn)
        navigate("/accsetup");
    })
  })

  return (
    <div className="App">
        <Navbar toggleCalendar={toggleCalendar} btntext={btntext} />
        <Scheduler calendar={calendar} userId={params.userId}/>
    </div>
  );
}

export default App;