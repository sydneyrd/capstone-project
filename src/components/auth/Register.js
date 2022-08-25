// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import "./Login.css"

// import { getUserByEmail, postNewUser } from "../APIManager"

// export const Register = (props) => {
//     const [user, setUser] = useState({
//         email: "",
//         userName: ""
//     })
//     let navigate = useNavigate()

//     const registerNewUser = (user) => {
//         return postNewUser(user)
//             .then(createdUser => {
//                 if (createdUser.hasOwnProperty("id")) {
//                     localStorage.setItem("roster_user", JSON.stringify({
//                         id: createdUser.id,
//                         userName: createdUser.userName,
//                         email: createdUser.email
//                     }))

//                     navigate("/home")
//                 }
//             })
//     }

//     const handleRegister = (e) => {
//         e.preventDefault()
//         return getUserByEmail()
//             .then(response => {
//                 if (response.length > 0) {
//                     // Duplicate email. No good.
//                     window.alert("Account with that email address already exists")
//                 }
//                 else {
//                     // Good email, create user.
//                     registerNewUser(user)
//                 }
//             })
//     }

//     const updateUser = (evt) => {
//         const copy = {...user}
//         copy[evt.target.id] = evt.target.value
//         setUser(copy)
//     }

//     return (
//         <main style={{ textAlign: "center" }}>
//             <form className="form--login" onSubmit={handleRegister}>
//                 <h1 className="h3 mb-3 font-weight-normal">Please Register to make stuffs</h1>
//                 <fieldset>
//                     <label htmlFor="userName"> Username </label>
//                     <input onChange={updateUser}
//                            type="text" id="userName" className="form-control"
//                            placeholder="Enter your desired username" required autoFocus />
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="email"> Email address </label>
//                     <input onChange={updateUser}
//                         type="email" id="email" className="form-control"
//                         placeholder="Email address" required />
//                 </fieldset>
               
//                 <fieldset>
//                     <button type="submit"> Register </button>
//                 </fieldset>
//             </form>
//         </main>
//     )
// }

import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../APIManager"
import "./Login.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("lu_token", res.token)
                        navigate("/profile")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Bio </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let other gamers know a little bit about you..." />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
