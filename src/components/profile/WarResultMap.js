import { Link } from "react-router-dom"
import { deleteCalculatedRoster} from "../APIManager"
export const WarResultMap = ({stat, setCount}) => {

   
    const handleDeleteClick = (click, stat) => {
    alert("successfully deleted")
      click.preventDefault()
      deleteCalculatedRoster(stat.id)
      setCount((count) => count + 2 )
    }
          
  
    return <><div className="saved--rosters"><Link to={`/resources/${stat.id}/view`}><div className="roster__link"  to="/roster">{stat.rosterName ? `${stat.rosterName}` : "War Stats"}</div></Link>
     <button className="delete__roster" onClick={click => handleDeleteClick(click, stat)}>Delete</button>
      </div></>
      
  }

