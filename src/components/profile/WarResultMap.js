import { Link } from "react-router-dom"
import { deleteCalculatedRoster} from "../APIManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'
export const WarResultMap = ({stat, getUserWarStats, setUserWarStats, localUser}) => {
library.add(faTrashCan)
    const handleDeleteClick = (click, stat) => {
    alert("successfully deleted")
      click.preventDefault()
      deleteCalculatedRoster(stat.id)
        getUserWarStats(localUser)
        .then((URost) => {
            setUserWarStats(URost)
        })
      
    }
          
  
    return <><div className="saved--rosters"><Link to={`/resources/${stat.id}/view`}><div className="roster__link"  to="/roster">{stat.rosterName ? `${stat.rosterName}` : "War Stats"}</div></Link>
    <FontAwesomeIcon className="delete__roster"onClick={click => handleDeleteClick(click, stat)}icon="fa-solid fa-trash-can" />
      </div></>
      
  }

