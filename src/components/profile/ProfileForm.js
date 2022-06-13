import { useState, useEffect } from "react"
import { updateProfile } from "../APIManager"



/// we need an id, a username, and an email address for the user object, text text put  whatdoonsubmit
//onSubmit={whatdoonsubmit} on form--login   onChange={updateUser} on input   

export const UpdateUser = () => {
    const [user, setUser] = useState({
        email: "",
        id: 0,
        userName: ""
    })


    const localRosterUser = localStorage.getItem("roster_user")
    const rosterUserObject = JSON.parse(localRosterUser)
    const localUser = {...rosterUserObject}

    setUser(localUser)

    const emailUpdate = (evt) => {
        const copy = { ...user }
        copy.email = evt.target.value
        setUser(copy)
    }
    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */


        updateProfile(user, user.id)


    }









    return <>
        <main style={{ textAlign: "center" }}>
            <form className="form--login" >

                <h1 className="h3 mb-3 font-weight-normal">Update Email</h1>


                <fieldset>
                    <label htmlFor="email"> Update email address </label>
                    <input onChange={(evt) => emailUpdate(evt)}
                        type="email" id="email" className="form-control"
                        value={user.email}
                        placeholder="Email address" required />
                </fieldset>

                <fieldset>
                    <button type="submit" onClick={<></>}> Update </button>
                </fieldset>
            </form>
        </main> </>

}
