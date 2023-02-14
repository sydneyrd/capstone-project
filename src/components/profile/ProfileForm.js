import { useState, useEffect } from "react"
import { updateProfile, getUserbyId } from "../managers/UserManager"
import { SavedRosters } from "./SavedRosters"
import { WarStats } from "./WarStats"

export const UpdateUser = () => {
    // const [feedback, setFeedback] = useState("")
    const [userWarStats, setUserWarStats] = useState([])
    const localRosterUser = localStorage.getItem("roster_user")
    const rosterUserObject = JSON.parse(localRosterUser)
    const localUser = { ...rosterUserObject }
//I'm not sure what I'm even using the feedback here for, prolly can lose that 
    const [user, setUser] = useState({
        //I only need to update the email and username, using the userId from local storage, so I only need to GET the same info from the database 
        id: localUser.id,
        user: {},
        username: "",
        email: ""
    })
    useEffect(
        () => {
        getUserbyId(localUser.id)
            .then((data) => {
            data.username =   data.user.username
            data.email = data.user.email
            setUser(data)
            {}
            })
        },
        [])

    // useEffect(() => {
    //     if (feedback !== "") {
    //         setTimeout(() => setFeedback(""), 3000);
    //     }
    // }, [feedback])

    const userUpdate = (evt) => {
        //updating the user object with the new values for email and username for api call
        const copy = { ...user }
        copy[evt.target.name] = evt.target.value
        setUser(copy)
    }
    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()
        let updatedUser = { id: user.id,
        email: user.email,
        username: user.username }
        updateProfile(updatedUser, user.id)
            .then(() => {
                // localStorage.setItem("roster_user", { id: user.id}) //I'm not sure that this is necesssary, isn't it already there?   it's not changing, and we aren't using the email for anything else
            }
            )
    }
    return <>
        {/* <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div> */}
        <main className="profile--page" style={{ textAlign: "center" }}>
            <form className="form--update" >
                <h1 className="h3 mb-3 font-weight-normal">Update Profile</h1>
                <fieldset className="form--update">
                    <label htmlFor="email"></label>
                    <input onChange={(evt) => userUpdate(evt)}
                        type="email" name="email" className="form-control--update"
                        value={user.email}
                        placeholder="Email address" required />
                    <label htmlFor="username"></label>
                        <input onChange={(evt) => userUpdate(evt)}
                        type="text" name="username" className="form-control--update"
                        value={user.username}
                        placeholder="" required />
                </fieldset>

                    <button className="email__button" type="submit" onClick={handleSaveButtonClick}> Update </button>
                
            </form>
            <div>  <h4>Saved Rosters</h4>
                <SavedRosters localUser={localUser} /></div>
            <div> <h4>War Results</h4>
                <WarStats userWarStats={userWarStats} setUserWarStats={setUserWarStats} localUser={localUser} /></div>
        </main> </>

}
