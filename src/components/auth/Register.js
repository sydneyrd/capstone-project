import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../managers/APIManager"
import "./register.css"

export const Register = () => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "email": email.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("roster_token", res.token)
                        navigate("/profile")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
<img src="./logo-no-background.png" alt="Your Logo" className="logo" />
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                
    <fieldset className="register">
        <div>
            <label className="register--label" htmlFor="inputUsername">Username</label>
            <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
        </div>
        <div>
            <label className="register--label" htmlFor="inputPassword"> Password </label>
            <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
        </div>
        <div>
            <label className="register--label" htmlFor="verifyPassword"> Verify Password </label>
            <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
        </div>
        <div>
            <label className="register--label" htmlFor="verifyPassword"> Email </label>
            <input type="email" ref={email} name="email" className="form-control" placeholder="name@website.com" />
        </div>
    </fieldset>
    <fieldset className="register--button--container" style={{ textAlign: "center" }}>
        <button className="register--button" type="submit">Register</button>
    </fieldset>
</form>

            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
