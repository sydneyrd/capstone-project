import { useState, useEffect } from "react"
import { updateProfile, getUserbyId } from "../managers/UserManager"
import { SavedRosters } from "./SavedRosters"
import { WarStats } from "./WarStats"

export const UpdateUser = () => {
    const [feedback, setFeedback] = useState("")
    const [userWarStats, setUserWarStats] = useState([])
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
        [])

    useEffect(() => {
        if (feedback !== "") {
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
                localStorage.setItem("roster_user", { id: user.id})
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
