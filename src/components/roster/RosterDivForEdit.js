import { CharacterList } from "./CharacterList"

export const RosterDivForEdit = ({c, setNewRosterPick, setEditCharacters, newRosterPicks, characters}) => {

 

let rightName = characters?.find(({id}) => id === c?.characterId)
    const handleRemove = (c, event) => {
      event.preventDefault() 
       let updatedRoster = newRosterPicks.filter((v) => v.id != c.id)
       
       setEditCharacters(updatedRoster)
    }
return <>
 <div className="roster__choices">{`${rightName?.character}`}<button onClick={click => handleRemove(c, click)}>Remove</button></div>
</>}


