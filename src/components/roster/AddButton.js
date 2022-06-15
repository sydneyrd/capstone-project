import { newRoster, newRosterChoice } from "../APIManager"
import { useState } from "react"


export const AddButton = ({ id, setStartRoster, startRoster }) => {
  
    const localUser = localStorage.getItem("roster_user")
    const rosterUser = JSON.parse(localUser)
   const handleStartClick = () => {
        let newR = {
            userId: rosterUser.id
        }  //posts successfully as a new roster
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
    const handleAddClick = () => {
 //weneed to post a new roster only once, not every time we add another player, maybe we need a button to build roster, could display the grid if true and also post the new roster when clicked
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


// onClick={addrosterchoiceobj, makeappearingrid, plus 1 to rosteramountusestate, if the roster ammount count is at 50 already pop up an error window}


//find the userId from the local storage, get the playerId from the selected element, fetch post object to rosterchoices
//render the name in the grid div compare to character list?


// showingrid -

// usestate that counts up to giv the div id number and 