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
        // setNewRosterPick(state => [...state, c])//only adding one object to an array usestate
        let new_choice = {roster: currentEditRoster,
            character: character.id}
console.log(rosterIDNUMBER)
        newRosterChoice(new_choice).then(()=>{getCurrentRoster(rosterIDNUMBER).then((res) => {setEditCharacters(res)})})
        //posts the new roster object to the api
        //.then we need to re get all of the current picks for the current edit roster
    }



    const handleStartClick = () => {
        let newR = {
            user: rosterUser.id
        }  //creates a new roster object with the user id
        newRoster(newR).then((newRosterObj) => { //posts the new roster object to the api
            let roster = { ...newRosterObj 
            } 
            setCurrentEditRoster(roster.id) //sets the context currentEditroster id to the new roster id
            // localStorage.setItem('roster_id', parseFloat(roster.id)) //saves the new roster id to local storage
            addChoiceToEnd(character) //adds the character to the roster useState
        })
        alert("Saving New Roster...")
    }



    const handleAddClick = () => {  //if there is a roster id in local storage, add the character to the roster useState
        newRosterPicks.find((playerId) => playerId.id === id) || editRosterCharacters.find((playerId) => playerId.characterId === id) ? 
            alert("already added") :
            addChoiceToEnd(character) //adds the character to the roster useState
    }



    return <>
        { currentEditRoster ? <FontAwesomeIcon onClick={() => handleAddClick()}className="plus" icon="fa-solid fa-plus" /> :
            <FontAwesomeIcon icon="fa-solid fa-plus" className="plus" onClick={() => handleStartClick()}/>}
    </>
}
