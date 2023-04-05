import { useState, useEffect } from "react"
import { updateProfile, getUserbyId } from "../managers/UserManager"
import { SavedRosters } from "./SavedRosters"
import { WarStats } from "./WarStats"

export const UpdateUser = () => {
    const [userWarStats, setUserWarStats] = useState([])
    const localRosterUser = localStorage.getItem("roster_user")
    const rosterUserObject = JSON.parse(localRosterUser)
    const localUser = { ...rosterUserObject }
    const [user, setUser] = useState({
        id: localUser.id,
        user: {},
        username: "",
        email: ""
    })
    useEffect(
        () => {
        getUserbyId(localUser.id)
            .then((data) => {
            data.username = data.user.username
            data.email = data.user.email
            setUser(data)
            {}})
        },
        [])
    const userUpdate = (evt) => {
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
                alert("Email updated")
            })}
    return <>
        <main className="profile--page" style={{ textAlign: "center" }}>
            <div className="left--container">
            <form className="form--update" >
                <h1 className="h3 mb-3 font-weight-normal">Update Email</h1>
                <fieldset className="form--update">
                    <label htmlFor="email"></label>
                    <input onChange={(evt) => userUpdate(evt)}
                        type="email" name="email" className="form-control--update"
                        value={user.email || ""}
                        placeholder="Email address" required />
                    
                        <button className="email__button" type="submit" onClick={handleSaveButtonClick}> Update </button>
                </fieldset>
                    
            </form></div>
            <div className="right--container--profile"> <div className="saved--roster"><h4>Rosters</h4>
                <SavedRosters localUser={localUser} /> </div> <div className="war--results"> <h4>War Results</h4>
                <WarStats userWarStats={userWarStats} setUserWarStats={setUserWarStats} localUser={localUser} /></div></div>
        </main> </>
}
