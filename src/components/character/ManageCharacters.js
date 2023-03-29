import { EditCharacter } from "./EditCharacter"
import { useState, useEffect } from "react"

//pass all the option/select props to it
export const ManageCharacters = ({ weapons, RosterUserObject, sortedCharacters, updateUserCharacters, factions, roles, servers, feedback, setFeedback }) => {
 
return <>
<>{sortedCharacters.map((ownedCharacter) => <EditCharacter   ownedCharacter={ownedCharacter} key={ownedCharacter?.id} 
    updateUserCharacters={updateUserCharacters}
    feedback={feedback}  RosterUserObject={RosterUserObject} setFeedback={setFeedback} weapons={weapons} factions={factions} roles={roles} servers={servers} />)}</>
            </>
}

