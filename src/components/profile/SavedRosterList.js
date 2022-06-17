import { Link } from "react-router-dom"
import {getCurrentRoster} from "../APIManager"

export const SavedRosterList = ({roster}) => {

  const handleClick = () => {

    localStorage.setItem("roster_id", roster.id)
    getCurrentRoster(roster)
  }
        

  return <><div>< Link className="navbar__link" onClick={handleClick} to="/roster">{roster.id}</Link></div></>
    
}

