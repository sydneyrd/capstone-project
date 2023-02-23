import { newRoster, newRosterChoice } from "../managers/RosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"



export const AddButton = ({ editRosterCharacters, character, id, setNewRosterPick, newRosterPicks }) => {
    const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);
    const localUser = localStorage.getItem("roster_user")
    const rosterUser = JSON.parse(localUser)
    const addUserToEnd = (c) => {
        setNewRosterPick(state => [...state, c])//only adding one object to an array usestate
    }
library.add(faPlus)
    const handleStartClick = () => {
        let newR = {
            user: rosterUser.id
        }  //creates a new roster object with the user id
        newRoster(newR).then((newRosterObj) => { //posts the new roster object to the api
            let roster = { ...newRosterObj 
            } 
            setCurrentEditRoster(roster.id) //sets the currentEditroster id to the new roster id
            localStorage.setItem('roster_id', parseFloat(roster.id)) //saves the new roster id to local storage
            addUserToEnd(character) //adds the character to the roster useState
        })
        alert("Saving New Roster...")
    }
    const handleAddClick = () => {  //if there is a roster id in local storage, add the character to the roster useState
        newRosterPicks.find((playerId) => playerId.id === id) || editRosterCharacters.find((playerId) => playerId.characterId === id) ? 
            alert("already added") :
            addUserToEnd(character) //adds the character to the roster useState
    }


    // const handleAddClick = () => {
    //     if (new Set([...newRosterPicks, ...editRosterCharacters]).has(id)) {  //checks to see if the character chosen already exists in the roster useState
    //       alert("already added");
    //     } else {
    //       addUserToEnd(character);  //adds the character to the roster useState
    //     }
    //   };
    return <>
        { currentEditRoster ? <FontAwesomeIcon onClick={() => handleAddClick()}className="plus" icon="fa-solid fa-plus" /> :
            <FontAwesomeIcon icon="fa-solid fa-plus" className="plus" onClick={() => handleStartClick()}/>}
    </>
}
// localStorage.getItem('roster_id')