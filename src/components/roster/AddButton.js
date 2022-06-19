import { newRoster, newRosterChoice } from "../APIManager"



export const AddButton = ({ character, id, setNewRosterPick }) => {
    // const [rosterCount, setRostercount ] = useState(0)
    const localUser = localStorage.getItem("roster_user")
    const rosterUser = JSON.parse(localUser)
    const addUserToEnd = (c) => {
        setNewRosterPick(state => [...state, c])//only adding one object to an array usestate
    }

    // const doubleAlert = () => {
    //     if newRoster.includes(characterId) to prevent doubles?
    // }
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
        let rosterID = localStorage.getItem("roster_id")
        let rosterIDNUMBER = JSON.parse(rosterID)
        let nrc = {
            rosterId: rosterIDNUMBER,
            characterId: id
        }
        addUserToEnd(character)
        
    }
    return <>
        {localStorage.getItem('roster_id') ? <button onClick={() => handleAddClick()} >Add to Roster</button> :
            <button onClick={() => handleStartClick()} >Add to Roster</button>}
    </>
}
