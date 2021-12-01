import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

function LogoutButton() {
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;

    const logout = () => {
        Axios
            .get(require("../config/logout"))
            .then((res) => {
                alert(res.data);
                navigate("/accsetup")
            })
    }
    
    return (
        <div className='LoginButton'>
            <button onClick={logout} className='btn btn-primary btn-lg'>LOGOUT</button>
        </div>
    )
}

export default LogoutButton;