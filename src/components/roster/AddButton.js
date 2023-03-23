import { newRoster, newRosterChoice } from "../managers/RosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"
import { getCurrentRoster } from "../managers/RosterManager"



export const AddButton = ({ setEditCharacters, nestedEditRosterCharacters, rosterIDNUMBER, editRosterCharacters, character, id, setNewRosterPick, newRosterPicks }) => {
    const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);
    const localUser = localStorage.getItem("roster_user")
    const rosterUser = JSON.parse(localUser)
    library.add(faPlus)

    const addChoiceToEnd = (character, rosterId, nextGroup) => {
        const new_choice = { roster: rosterId, character: character.id, group: nextGroup}

        newRosterChoice(new_choice)
            .then(() => { getCurrentRoster(rosterId).then((res) => { setEditCharacters(res) }) })

    }
    const findNextAvailableGroup = (nestedArray) => {
        for (let i = 0; i < nestedArray.length; i++) {
          if (nestedArray[i].length < 5) {
            return i + 1;
          }
        }
        return nestedArray.length + 1; // All groups are full
      };
      
      
    const handleStartClick = async () => {
        let newR = { user: rosterUser.id }  //creates a new roster object with the user id
        newRoster(newR).then((newRosterObj) => { //posts the new roster object to the api
            setCurrentEditRoster(newRosterObj.id);
            const nextGroup = findNextAvailableGroup(nestedEditRosterCharacters);
            addChoiceToEnd(character, newRosterObj.id, nextGroup);
            //adds the character to the database 
        });

        alert("Saving New Roster...")
    }


    const handleAddClick = () => {
        // editRosterCharacters.find((playerId) => playerId.characterId === id) ? 
        //     alert("already added") :
        let nextGroup = findNextAvailableGroup(nestedEditRosterCharacters);
        editRosterCharacters.length >= 50 ? alert("Roster is full") :
            addChoiceToEnd(character, rosterIDNUMBER, nextGroup) //adds the character to the database
    }


    return <>
        {currentEditRoster > 0 ? <FontAwesomeIcon onClick={() => handleAddClick()} className="plus" icon="fa-solid fa-plus" /> :
            <FontAwesomeIcon icon="fa-solid fa-plus" className="plus" onClick={() => handleStartClick()} />}
    </>
}
