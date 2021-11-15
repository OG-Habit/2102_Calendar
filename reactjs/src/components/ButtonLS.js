import React from 'react';

const ButtonLS = ({mode, changeToLogin, changeToSignup}) => {
    let l = "";
    let s = "";

    if(mode === "login") {
        l = "btn-ls--focus";
    } else {
        s = "btn-ls--focus";
    }

    return (
        <div className="btn-ls">
            <button className={l} onClick={changeToLogin}>Login</button>
            <button className={s} onClick={changeToSignup}>Sign up</button>
        </div>
    );
}

export default ButtonLS;