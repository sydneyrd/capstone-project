import { click } from "@testing-library/user-event/dist/click"
import { Link } from "react-router-dom"
import {getCurrentRoster} from "../APIManager"
import { deleteRoster } from "../APIManager"

export const SavedRosterList = ({roster}) => {

  const handleClick = () => {

    localStorage.setItem("roster_id", roster.id)
    getCurrentRoster(roster)
  }

  const handleDeleteClick = (click, roster) => {
  alert("successfully deleted")
    click.preventDefault()
    deleteRoster(roster.id)
  }
        

  return <><div>< Link className="roster__link" onClick={handleClick} to="/roster">Roster #{roster.id}</Link><div>
    <button className="delete__button" onClick={click => handleDeleteClick(click, roster)}>Delete Roster</button></div></div></>
    
}

