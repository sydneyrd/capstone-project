import { click } from "@testing-library/user-event/dist/click"
import { Link } from "react-router-dom"
import {getCurrentRoster} from "../APIManager"
import { deleteRoster } from "../APIManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'


export const SavedRosterList = ({roster, getUserRosters, setUserRosters, localUser}) => {
library.add(faTrashCan)
  const handleClick = () => {

    localStorage.setItem("roster_id", roster.id)
  }

  const handleDeleteClick = (click, roster) => {
  alert("successfully deleted")
    click.preventDefault()
    deleteRoster(roster.id)
    localStorage.removeItem("roster_id") 
    getUserRosters(localUser)
        .then((URost) => {
          setUserRosters(URost)
        })
  }
        

  return <><div className="saved--rosters">< Link className="roster__link" onClick={handleClick} to="/roster">{roster.name ? `${roster.name}` : `Roster #${roster.id}`}
  
  </Link>
    <FontAwesomeIcon className="delete__roster" onClick={click => handleDeleteClick(click, roster)}icon="fa-solid fa-trash-can"/></div></>
    
}

