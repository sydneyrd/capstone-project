import { deleteRosterChoice } from "../APIManager"
import { CharacterList } from "./CharacterList"

export const RosterDivForEdit = ({c, showText, setShowText, charId, setNewRosterPick, setCharId, handleMouseEnter, handleMouseLeave,
   setEditCharacters, newRosterPicks, characters}) => {

 

let rightName = characters?.find(({id}) => id === c?.character)
    const handleRemove = (c, event) => {
      event.preventDefault() 
       let updatedRoster = newRosterPicks.filter((v) => v.id != c.id)
       setEditCharacters(updatedRoster)
       deleteRosterChoice(c.id)
    }
return <>
 <div id={rightName?.id} onMouseOver={setCharId} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} className="roster__choices">{`${c?.character?.character_name}`}<button className="roster__remove" onClick={click => handleRemove(c, click)}>Remove</button></div>
</>}


