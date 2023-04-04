import { Link } from "react-router-dom"
import { deleteCalculatedRoster } from "../managers/CalculatedRosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons"
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons"

import { useContext } from "react"
import { calculateContext } from "../views/ApplicationViews"
export const WarResultMap = ({ stat, getUserWarStats, setUserWarStats, publishRoster }) => {
      // Use the useContext hook to access the current value and update function of the second context
const { setCurrentCalculateRoster } = useContext(calculateContext);

  library.add(faTrashCan, faShareFromSquare, faRectangleXmark)
 

  const handleDeleteClick = (click, stat) => {
    click.preventDefault()
    deleteCalculatedRoster(stat.id)
    .then((res) =>  (
    getUserWarStats()
    )).then(URost => {
    setUserWarStats(URost)})
  }
  const handlePublish = (click, public_status, id) => {
    click.preventDefault();
    if (stat.is_public) {
      if (window.confirm("Are you sure you want to make this roster private?")) {
        publishRoster(public_status, id);
      }
    } else {
      if (window.confirm("Are you sure you want to make this roster public?")) {
        publishRoster(public_status, id);
      }
    }
  };


  return <div className="saved--rosters"><Link onClick={click => setCurrentCalculateRoster(stat.id)}to={`/resources/${stat.id}/view`}><div className="roster__link" to="/roster">{stat.rosterName ? `${stat.rosterName}` : "War Stats"}</div></Link>
    <FontAwesomeIcon className="delete__roster" onClick={click => handleDeleteClick(click, stat)} icon="fa-solid fa-trash-can" />

{
  stat.is_public ? <FontAwesomeIcon className="publish__roster" onClick={click => handlePublish(click, false, stat.id)} icon="fa-solid fa-rectangle-xmark" /> : <FontAwesomeIcon className="publish__roster" onClick={click => handlePublish(click, true, stat.id)} icon="fa-solid fa-share-from-square" />
}

    {/* icon to link to edit view

    icon to make public */}




  </div>

}

