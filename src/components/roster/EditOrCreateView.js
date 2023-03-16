// import { useState, useEffect } from "react"
// import { getCurrentRoster } from "../managers/RosterManager"
// import { RosterGrid } from "./RosterGrid"

// export const EditOrCreateView = ({ rosterIDNUMBER, newRosterPicks, setNewRosterPick, characters }) => {
//     const [editPicks, setEditPicks] = useState([])
//     useEffect(
//         () => {
//             if (rosterIDNUMBER)
//             getCurrentRoster(rosterIDNUMBER)
//                 .then((res) => {
//                     setEditPicks(res)
//                 })
//         },
//         []
//     )
// {rosterIDNUMBER ? <div className="parent" ><RosterGrid newRosterPicks={editPicks} setNewRosterPick={setNewRosterPick} characters={characters} /></div>
//                         :
// <><div className="parent" ><RosterGrid newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} characters={characters} /></div></>}
    
            
// }