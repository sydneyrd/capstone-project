import { newRoster, newRosterChoice } from "../APIManager"
import { useState } from "react"


export const AddButton = ({ id, setStartRoster, startRoster }) => {
  
    const localUser = localStorage.getItem("roster_user")
    const rosterUser = JSON.parse(localUser)
   
    const handleStartClick = () => {
        let newR = {
            userId: rosterUser.id
        }
newRoster(newR).then((newRosterObj) => {
            let roster = { ...newRosterObj }
            setStartRoster(parseFloat(roster.id))
            let nrc = {
                rosterId: parseFloat(roster.id),
                characterId: id
            }
            newRosterChoice(nrc)
        })
    }
    const handleAddClick = () => {
 //weneed to post a new roster only once, not every time we add another player, maybe we need a button to build roster, could display the grid if true and also post the new roster when clicked
let nrc = {
            rosterId: startRoster,
            characterId: id
        }
        newRosterChoice(nrc)
    }
    return <>
        {startRoster ? <button onClick={() => handleAddClick()} >Add to Roster</button> :
            <button onClick={() => handleStartClick()} >Add to Roster</button>}
    </>
}


// onClick={addrosterchoiceobj, makeappearingrid, plus 1 to rosteramountusestate, if the roster ammount count is at 50 already pop up an error window}


//find the userId from the local storage, get the playerId from the selected element, fetch post object to rosterchoices
//render the name in the grid div compare to character list?


// showingrid -

// usestate that counts up to giv the div id number and 