import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

import { getUserByEmail, postNewUser } from "../APIManager"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        userName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = (user) => {
        return postNewUser(user)
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("roster_user", JSON.stringify({
                        id: createdUser.id,
                        userName: createdUser.userName,
                        email: createdUser.email
                    }))

                    navigate("/home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return getUserByEmail()
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser(user)
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register to make stuffs</h1>
                <fieldset>
                    <label htmlFor="userName"> Username </label>
                    <input onChange={updateUser}
                           type="text" id="userName" className="form-control"
                           placeholder="Enter your desired username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
               
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

