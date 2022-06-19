import { click } from "@testing-library/user-event/dist/click"
import { deleteRosterChoice } from "../APIManager"


    
export const RosterDiv = ({c, setNewRosterPick, newRosterPicks}) => {
    
    const handleRemove = (c, event) => {
      event.preventDefault() 
       let updatedRoster = newRosterPicks.filter((v) => v.id != c.id)
       setNewRosterPick(updatedRoster)
      //  deleteRosterChoice(c.id)  //on removing from a roster that hasn't been saved yet we don't need to delete the choice from the actual database 
      // i have removed this functionality for now, but watch for breakage
    }
return <>
 <div className="roster__choices">{c?.character}<button className="roster__remove" onClick={click => handleRemove(c, click)}>Remove</button></div>
</>

}

