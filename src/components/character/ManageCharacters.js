import { EditCharacter } from "./EditCharacter"
import { useState, useEffect } from "react"
import { getAllCharacters } from "../APIManager"
// get the list of user characters and then iterate the character form through it
//pass all the option/select props to it
export const ManageCharacters = ({ weapons, userCharacters, updateUserCharacters, factions, roles, servers, feedback, setFeedback }) => {
    const localRosterUser = localStorage.getItem("roster_user")
    const RosterUserObject = JSON.parse(localRosterUser)
   const [characters, setCharacters] = useState([])
 // When this array is empty, you are observing initial component state
 
   



   
return <>


<div>{userCharacters.map((ownedCharacter) => <EditCharacter key={`${ownedCharacter.id}`} 
    updateUserCharacters={updateUserCharacters}
    feedback={feedback} ownedCharacter={ownedCharacter} characters={characters} RosterUserObject={RosterUserObject} setFeedback={setFeedback} weapons={weapons} factions={factions} roles={roles} servers={servers} />)}</div>
            
</>
}

//  updateCharacter={updateCharacter}updatedCharacter={updatedCharacter}