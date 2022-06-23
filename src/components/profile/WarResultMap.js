import { Link } from "react-router-dom"
import { deleteCalculatedRoster, deleteAllCalculatedChoices} from "../APIManager"
export const WarResultMap = ({stat, setCount}) => {

   
    const handleDeleteClick = (click, stat) => {
    alert("successfully deleted")
      click.preventDefault()
      deleteCalculatedRoster(stat.id)
      .then(() => {
        deleteAllCalculatedChoices(stat.id)
      })
      
      setCount((count) => count + 1)
    }
          
  
    return <><div className="saved--rosters"><Link to={`/resources/${stat.id}/view`}><div className="roster__link"  to="/roster">{stat.rosterName ? `${stat.rosterName}` : "War Stats"}</div></Link>
     <button className="delete__roster" onClick={click => handleDeleteClick(click, stat)}>Delete</button>
      </div></>
      
  }

