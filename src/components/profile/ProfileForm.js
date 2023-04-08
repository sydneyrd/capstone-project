import { useState, useEffect } from "react"
import { updateProfile} from "../managers/UserManager"
import { SavedRosters } from "./SavedRosters"
import { WarStats } from "./WarStats"

export const UpdateUser = () => {
    const [userWarStats, setUserWarStats] = useState([])
  
 
    return <>
        <main className="profile--page" style={{ textAlign: "center" }}>
            <div className="left--container">
            <form className="form--update" >
                <h1 className="h3 mb-3 font-weight-normal"></h1>
                <fieldset className="form--update">
                    <label htmlFor="email"></label>
                    {/* <input 
                        type="email" name="email" className="form-control--update"
                        placeholder="this field does nothing right now" required />
                    here is where I can put the company information when i'm ready
                        <button className="email__button" type="submit"> leaving for styling reasons sue me </button> */}
                </fieldset>
                    
            </form></div>
            <div className="right--container--profile"> <div className="saved--roster"><h4>Rosters</h4>
                <SavedRosters  /> </div> <div className="war--results"> <h4>War Results</h4>
                <WarStats userWarStats={userWarStats} setUserWarStats={setUserWarStats}  /></div></div>
        </main> </>
}
