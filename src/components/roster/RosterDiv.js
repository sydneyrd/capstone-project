
import { deleteRosterChoice } from "../APIManager"


    
export const RosterDiv = ({c, setNewRosterPick, newRosterPicks, showText, setShowText, charId, setCharId, handleMouseEnter, handleMouseLeave,}) => {
    
    const handleRemove = (c, event) => {
      event.preventDefault() 
       let updatedRoster = newRosterPicks.filter((v) => v.id !== c.id)
       setNewRosterPick(updatedRoster)
        deleteRosterChoice(c.id)  //on removing from a roster that hasn't been saved yet we don't need to delete the choice from the actual database 
      // i have removed this functionality for now, but watch for breakage
    }
return <>
 <div id={c?.id} onMouseOver={setCharId} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}className="roster__choices">{c?.character_name}<button className="roster__remove" onClick={click => handleRemove(c, click)}>Remove</button></div>
</>

}

