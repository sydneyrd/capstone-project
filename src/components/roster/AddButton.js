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

// const addChoiceToEnd = (character) => {
//     let new_choice = {
//       roster: currentEditRoster,
//       character: character.id
//     }
  
//     newRosterChoice(new_choice).catch((error) => {
//       if (error.response && error.response.data && error.response.data.message === "UNIQUE constraint failed: nocapapi_rosterchoices.roster_id, nocapapi_rosterchoices.character_id") {
//         window.alert("This character is already in the roster");
//       } else {
//         console.error(error);
//       }
//     }).then((response) => {
//         getCurrentRoster(rosterIDNUMBER).then((res) => {
//           setEditCharacters(res);
//         });
//       });
//   }
  

    const handleStartClick = () => {
        let newR = {
            user: rosterUser.id
        }  //creates a new roster object with the user id
        newRoster(newR).then((newRosterObj) => { //posts the new roster object to the api
            let roster = { ...newRosterObj 
            } 
            setCurrentEditRoster(roster.id) //sets the context currentEditroster id to the new roster id
            addChoiceToEnd(character) //adds the character to the database
        })
        alert("Saving New Roster...")
    }



    const handleAddClick = () => {  
         editRosterCharacters.find((playerId) => playerId.characterId === id) ? 
            alert("already added") :
            addChoiceToEnd(character) //adds the character to the database
    }



    return <>
        { currentEditRoster ? <FontAwesomeIcon onClick={() => handleAddClick()}className="plus" icon="fa-solid fa-plus" /> :
            <FontAwesomeIcon icon="fa-solid fa-plus" className="plus" onClick={() => handleStartClick()}/>}
    </>
}
