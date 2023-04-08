import React, { useState, useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import {loginUser} from "../managers/APIManager"
import "./Login.css"



export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      loginUser(user).then((res) => {
        if ('valid' in res && res.valid && 'token' in res) {
          localStorage.setItem('roster_token', res.token);
          navigate('/profile');
        } else {
          if ('error' in res) {
            setErrorMessage(res.error);
          } else {
            invalidDialog.current.showModal();
          }
        }
      });
    };

    return (
        <main className="container--login">
            <img src="./logo-no-background.png" alt="Your Logo" className="logo" />
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <fieldset className="login">
                        
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset className="login">
                        
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <fieldset className="login" style={{
                        textAlign: "center"
                    }}>
                        <button className="login--button" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
               
            </section> <Link to="/password-reset">Forgot your password?</Link>
        </main>
    )
}
