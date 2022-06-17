import { click } from "@testing-library/user-event/dist/click"
import { deleteRosterChoice } from "../APIManager"

    
export const RosterDiv = ({c, setNewRosterPick, newRosterPicks}) => {
    
    const handleRemove = (c, event) => {
      event.preventDefault() 
       let updatedRoster = newRosterPicks.filter((v) => v.id != c.id)
       setNewRosterPick(updatedRoster)
    }
return <>
 <div className="roster__choices">{c?.character}<button onClick={click => handleRemove(c, click)}>Remove</button></div>
</>

}

//addremovebutton