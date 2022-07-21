import { newRoster, newRosterChoice } from "../APIManager"

//if id of character matches an id in the new roster picks already don't allow the add
//id for character id, newRosterPicks for the array of picks


export const AddButton = ({ editRosterCharacters, character, id, setNewRosterPick, newRosterPicks }) => {
    // const [rosterCount, setRostercount ] = useState(0)
    const localUser = localStorage.getItem("roster_user")
    const rosterUser = JSON.parse(localUser)
    const addUserToEnd = (c) => {
        setNewRosterPick(state => [...state, c])//only adding one object to an array usestate
    }

    const handleStartClick = () => {
        let newR = {
            userId: rosterUser.id
        }  //posts successfully as a new roster sets a localitem to check for to condition to only run one time.
        newRoster(newR).then((newRosterObj) => {
            let roster = { ...newRosterObj }
            localStorage.setItem('roster_id', parseFloat(roster.id))
            addUserToEnd(character)
        })
        alert("Saving New Roster...")
    }
    const handleAddClick = () => {  //posts if an existing roster object is found in localstorage so we only get 1 roster id on all choices made in this session
       
        //     characterId: id  //need another OR if .length is too much to add another player, or set a window alert or something
        newRosterPicks.find((playerId) => playerId.id === id) || editRosterCharacters.find((playerId) => playerId.characterId === id) ? 
        // } //^i don't think i need this in the add click anymore check yeah i don't think so delete this when you feel ready babey 
            //just added this ternary statement, it worked okay without it, keep an eye on it.  just cheking for doubles//works on edit now
            alert("already added") :
            addUserToEnd(character)
    }
    return <>
        {localStorage.getItem('roster_id') ? <button className="add__button"onClick={() => handleAddClick()} >Add</button> :
            <button className="add__button" onClick={() => handleStartClick()} >Add</button>}
    </>
}
