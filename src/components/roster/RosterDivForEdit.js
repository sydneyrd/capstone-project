import { CharacterList } from "./CharacterList"

export const RosterDivForEdit = ({c, setNewRosterPick, newRosterPicks, characters}) => {
    

let rightName = characters.find(({id}) => id === id.character)
    const handleRemove = (c, event) => {
      event.preventDefault() 
       let updatedRoster = newRosterPicks.filter((v) => v.id != c.id)
       setNewRosterPick(updatedRoster)
    }
return <>
 <div className="roster__choices">{rightName}<button onClick={click => handleRemove(c, click)}>Remove</button></div>
</>}
