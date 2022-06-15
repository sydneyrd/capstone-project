import { newRoster, newRosterChoice } from "../APIManager"



export const AddButton = ({ id, }) => {
  const localUser = localStorage.getItem("roster_user")
    const rosterUser = JSON.parse(localUser)
   const handleStartClick = () => {
        let newR = {
            userId: rosterUser.id
        }  //posts successfully as a new roster sets a localitem to check for to condition to only run one time.
newRoster(newR).then((newRosterObj) => {
            let roster = { ...newRosterObj }
localStorage.setItem('roster_id', parseFloat(roster.id))

         let nrc = {
                rosterId: parseFloat(roster.id),
                characterId: id
            }
            newRosterChoice(nrc)
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
        newRosterChoice(nrc)
    }
    return <>
       {  localStorage.getItem('roster_id') ? <button onClick={() => handleAddClick()} >Add to Roster</button> :
            <button onClick={() => handleStartClick()} >Add to Roster</button>}
    </>
}
