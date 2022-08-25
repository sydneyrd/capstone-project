import { useState, useEffect } from "react"
import { updateProfile, getUserbyId } from "../APIManager"
import { SavedRosters } from "./SavedRosters"
import { WarStats } from "./WarStats"



/// we need an id, a username, and an email address for the user object, text text put  whatdoonsubmit
//onSubmit={whatdoonsubmit} on form--login   onChange={updateUser} on input   

export const UpdateUser = () => {
    const [feedback, setFeedback] = useState("")
    const localRosterUser = localStorage.getItem("roster_user")
    const rosterUserObject = JSON.parse(localRosterUser)
    const localUser = { ...rosterUserObject }

    const [user, setUser] = useState({
        
    })
    useEffect(
        () => {
          getUserbyId(localUser.id)
            .then((data) => {
              setUser(data)
            })
        },
        []
      )

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const userUpdate = (evt) => {
        const copy = { ...user }
        copy[evt.target.name] = evt.target.value
        setUser(copy)
    }
    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()
        updateProfile(user, user.id)
            .then(() => {
                setFeedback("Email successfully updated")
                localStorage.setItem("roster_user", { email: user.email, id: user.id})
            }
            )
    }
    return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <main className="profile--page" style={{ textAlign: "center" }}>
            <form className="form--update" >

                <h1 className="h3 mb-3 font-weight-normal">Update Profile</h1>


                <fieldset>
                    <label htmlFor="email"></label>
                    <input onChange={(evt) => userUpdate(evt)}
                        type="email" name="email" className="form-control"
                        value={user.email}
                        placeholder="Email address" required />
                    <label htmlFor="username"></label>
                        <input onChange={(evt) => userUpdate(evt)}
                        type="text" name="username" className="form-control"
                        value={user.username}
                        placeholder="" required />
                    <label htmlFor="First Name"></label>
                    <input onChange={(evt) => userUpdate(evt)}
                    type="text" name="first_name" className="form-control"
                    value={user.first_name} placeholder="" required />
                <label htmlFor="lastName"></label>
                <input onChange={(evt) => userUpdate(evt)}
                type="text" name="last_name" className="form-control"
                value={user.last_name} placeholder="" required />
                </fieldset>

                <fieldset>
                    <button className="email__button" type="submit" onClick={handleSaveButtonClick}> Update </button>
                </fieldset>
            </form>
            <div>  <h4>Saved Rosters</h4>
                <SavedRosters localUser={localUser} /></div>
            <div> <h4>War Results</h4>
                <WarStats localUser={localUser} /></div>
        </main> </>

}
