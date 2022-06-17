import { Navigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
export const SavedRosters = () => {
  const  navigate = Navigate
   //if statement no saved rosters no display
//    const onClickFunc = (e) => {
//     e.preventDefault()
//     {
//         localStorage.setItem("roster_user", JSON.stringify({
//             RosterId: correctRoster.Id
            
//         }))
// }   
   
    return <><h4>roster 1</h4> < Link className="navbar__link" to="/roster">click to view and edit</Link>
            <h4>roster 2</h4><button>click to view and edit need to navigate to Roster and load the correct roster into the rosterChoices array</button></> }





// 