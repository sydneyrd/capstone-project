import { newRoster, newRosterChoice } from "../managers/RosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"
import { getCurrentRoster } from "../managers/RosterManager"



export const AddButton = ({ setEditCharacters, nestedEditRosterCharacters, rosterIDNUMBER, editRosterCharacters, character, id, setNewRosterPick, newRosterPicks }) => {
    const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);
    library.add(faPlus)

    const addChoiceToEnd = (character, rosterId, nextGroup) => {
        const new_choice = { roster: rosterId, character: character.id, group: nextGroup}

        newRosterChoice(new_choice)
            .then(() => { getCurrentRoster(rosterId).then((res) => { setEditCharacters(res) }) })

    }

    const handleStartClick = async () => {
        // let newR = { user: rosterUser.id }  //creates a new roster object with the user id
        newRoster().then((newRosterObj) => { //posts the new roster object to the api
            setCurrentEditRoster(newRosterObj.id);
            const nextGroup = findNextAvailableGroup(nestedEditRosterCharacters);
            addChoiceToEnd(character, newRosterObj.id, nextGroup);
            //adds the character to the database 
        });

        alert("Saving New Roster...")
    }

    const findNextAvailableGroup = (charactersArray) => {
        const groups = {};
      
        // Count the number of characters in each group
        charactersArray.forEach((character) => {
          if (!groups[character.group]) {
            groups[character.group] = 1;
          } else {
            groups[character.group]++;
          }
        });
      
        for (let i = 1; i <= 10; i++) {
          if (!groups[i] || groups[i] < 5) {
            return i;
          }
        }
        return -1; // All groups are full
      };
      
      const handleAddClick = () => {
        let nextGroup = findNextAvailableGroup(editRosterCharacters);
        if (nextGroup === -1) {
          alert("All groups are full");
        } else if (editRosterCharacters.length >= 50) {
          alert("Roster is full");
        } else {
          addChoiceToEnd(character, rosterIDNUMBER, nextGroup); //adds the character to the database
        }
      };
      

    return <>
        {currentEditRoster > 0 ? <FontAwesomeIcon onClick={() => handleAddClick()} className="plus" icon="fa-solid fa-plus" /> :
            <FontAwesomeIcon icon="fa-solid fa-plus" className="plus" onClick={() => handleStartClick()} />}
    </>
}
