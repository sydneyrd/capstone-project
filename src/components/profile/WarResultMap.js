import { Link } from "react-router-dom"

export const WarResultMap = ({stat, setCount}) => {

   
    const handleDeleteClick = (click) => {
    alert("successfully deleted")
      click.preventDefault()
    //   deleteRoster(roster.id)//
      setCount((count) => count + 1)
    }
          
  
    return <><div className="saved--rosters"><Link to={`/resources/${stat.id}/view`}><div className="roster__link"  to="/roster">{stat.rosterName}</div></Link>
      </div></>
      
  }
  
