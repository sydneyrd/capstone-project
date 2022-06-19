import { EditCharacter } from "./EditCharacter"
import { useState, useEffect } from "react"

//pass all the option/select props to it
export const ManageCharacters = ({ weapons, userCharacters, updateUserCharacters, factions, roles, servers, feedback, setFeedback }) => {
    const localRosterUser = localStorage.getItem("roster_user")
    const RosterUserObject = JSON.parse(localRosterUser)

 //mapping and creating character cards for owned characters  
return <>
<>{userCharacters.map((ownedCharacter) => <EditCharacter  ownedCharacter={ownedCharacter} key={ownedCharacter?.id} 
    updateUserCharacters={updateUserCharacters}
    feedback={feedback}  RosterUserObject={RosterUserObject} setFeedback={setFeedback} weapons={weapons} factions={factions} roles={roles} servers={servers} />)}</>
            </>
}

