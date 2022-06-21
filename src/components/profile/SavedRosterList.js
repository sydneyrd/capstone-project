import { click } from "@testing-library/user-event/dist/click"
import { Link } from "react-router-dom"
import {getCurrentRoster} from "../APIManager"
import { deleteRoster } from "../APIManager"

export const SavedRosterList = ({roster, setCount}) => {

  const handleClick = () => {

    localStorage.setItem("roster_id", roster.id)
    getCurrentRoster(roster)
  }

  const handleDeleteClick = (click, roster) => {
  alert("successfully deleted")
    click.preventDefault()
    deleteRoster(roster.id)
    setCount((count) => count + 1)
  }
        

  return <><div className="saved--rosters">< Link className="roster__link" onClick={handleClick} to="/roster">Roster #{roster.id}</Link>
    <button className="delete__roster" onClick={click => handleDeleteClick(click, roster)}>Delete Roster</button></div></>
    
}

