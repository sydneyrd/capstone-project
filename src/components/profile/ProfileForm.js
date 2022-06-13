import { useState, useEffect } from "react"
import { updateProfile } from "../APIManager"



/// we need an id, a username, and an email address for the user object, text text put  whatdoonsubmit
//onSubmit={whatdoonsubmit} on form--login   onChange={updateUser} on input   

export const UpdateUser = () => {
    const [feedback, setFeedback] = useState("")
    const localRosterUser = localStorage.getItem("roster_user")
    const rosterUserObject = JSON.parse(localRosterUser)
    const localUser = {...rosterUserObject}

    const [user, setUser] = useState({
        email: localUser.email,
        id: localUser.id,
        username: localUser.userName
    })

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
   

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
        .then(() => {
            setFeedback("Email successfully updated")
        }
        )


    }









    return <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
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
                    <button type="submit" onClick={handleSaveButtonClick}> Update </button>
                </fieldset>
            </form>
        </main> </>

}
