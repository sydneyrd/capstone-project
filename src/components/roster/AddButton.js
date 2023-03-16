import { newRoster, newRosterChoice } from "../managers/RosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"
import { getCurrentRoster } from "../managers/RosterManager"



export const AddButton = ({setEditCharacters, rosterIDNUMBER, editRosterCharacters, character, id, setNewRosterPick, newRosterPicks }) => {
const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);
const localUser = localStorage.getItem("roster_user")
const rosterUser = JSON.parse(localUser)
library.add(faPlus)


const addChoiceToEnd = (character) => {
        let new_choice = {roster: currentEditRoster,
            character: character.id}
        newRosterChoice(new_choice)
        .then(()=>{getCurrentRoster(rosterIDNUMBER).then((res) => {setEditCharacters(res)})})
    }

    const handleStartClick = () => {
        let newR = {user: rosterUser.id}  //creates a new roster object with the user id

        newRoster(newR).then((newRosterObj) => { //posts the new roster object to the api

            setCurrentEditRoster(newRosterObj.id); 
            
            //sets the context currentEditroster id to the new roster id
            
            
        }).then(() => {addChoiceToEnd(character)})

        //adds the character to the database
        alert("Saving New Roster...")
    }



    const handleAddClick = () => {  
        editRosterCharacters.find((playerId) => playerId.characterId === id) ? 
            alert("already added") :
            addChoiceToEnd(character) //adds the character to the database
    }



    return <>
        { currentEditRoster > 0 ? <FontAwesomeIcon onClick={() => handleAddClick()}className="plus" icon="fa-solid fa-plus" /> :
            <FontAwesomeIcon icon="fa-solid fa-plus" className="plus" onClick={() => handleStartClick()}/>}
    </>
}
