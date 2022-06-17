import { Link } from "react-router-dom"

export const SavedRosterList = ({roster}) => {


        

  return <><div>< Link className="navbar__link" onClick={() => {
    localStorage.setItem("roster_id", roster.id)}} to="/roster">{roster.id}</Link></div></>
    
}

