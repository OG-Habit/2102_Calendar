import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import AccountSetup from './components/AccountSetup';
import './index.css';
import './font-awesome-4.7.0/css/font-awesome.min.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route path="/:userId" element={<App />} />
        <Route path="/" element={<AccountSetup />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();