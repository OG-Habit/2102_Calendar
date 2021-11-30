// import './App.css';
import Scheduler from './components/Scheduler';
import Navbar from './components/Navbar';
import React, { useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Axios from 'axios';

function App() {
  const params = useParams();
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3000/accsetup").then((res) => {
      if(!res.data.loggedIn)
        navigate("/accsetup");
    })
  })

  return (
    <div className="App">
        <Navbar />
        <Scheduler userId={params.userId}/>
    </div>
  );
}

export default App;