import { Link } from "react-router-dom"
import { deleteRoster } from "../managers/RosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"


export const SavedRosterList = ({roster, getUserRosters, setUserRosters, localUser}) => {
    // Use the useContext hook to access the current value and update function of the first context
    const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);

console.log(currentEditRoster)
library.add(faTrashCan)
  const handleClick = () => {
    localStorage.setItem("roster_id", roster.id) //setting the current roster id to local storage before/during navigation
    setCurrentEditRoster(roster.id)

  }
  const handleDeleteClick = (click, roster) => {
  alert("successfully deleted")
    click.preventDefault()
    deleteRoster(roster.id).then(() => localStorage.removeItem("roster_id") 
    ).then(()=>getUserRosters(localUser) )
        .then((URost) => {
          setUserRosters(URost)
        })
  }
        
  return <div className="saved--rosters">< Link className="roster__link" onClick={handleClick} to="/roster">{roster.name ? `${roster.name}` : `Roster #${roster.id}`}
  </Link>
    <FontAwesomeIcon className="delete__roster" onClick={click => handleDeleteClick(click, roster)}icon="fa-solid fa-trash-can"/></div>
    
}

