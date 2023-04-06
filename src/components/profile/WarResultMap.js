import { Link } from "react-router-dom"
import { deleteCalculatedRoster } from "../managers/CalculatedRosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons"
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { calculateContext } from "../views/ApplicationViews"
import {HoverableElement }from "./HoverableElement"
export const WarResultMap = ({ stat, getUserWarStats, setUserWarStats, publishRoster }) => {
      // Use the useContext hook to access the current value and update function of the second context
const { setCurrentCalculateRoster } = useContext(calculateContext);

  library.add(faTrashCan, faShareFromSquare, faRectangleXmark, faPenToSquare)
 let navigate = useNavigate()

  const handleDeleteClick = (click, stat) => {
    click.preventDefault();
 const userConfirmed = window.confirm(
      "Are you sure you want to delete this roster? This action can't be undone."
    );
   if (userConfirmed) {
    deleteCalculatedRoster(stat.id)
    .then((res) =>  (
    getUserWarStats()
    )).then(URost => {
    setUserWarStats(URost)})
 alert("Roster successfully deleted");
    }
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

const handleEditClick = (click) => {
  click.preventDefault()
  setCurrentCalculateRoster(stat.id)
  navigate(`/resources/edit/${stat.id}`)
}

  return <div className="saved--rosters"><Link onClick={click => setCurrentCalculateRoster(stat.id)}to={`/resources/${stat.id}/view`}><div className="roster__link" to="/roster">{stat.rosterName ? `${stat.rosterName}` : "War Stats"}</div></Link>
  
<div className="war--icons--container">
<HoverableElement
  tooltipText="edit"
  onElementClick={handleEditClick}
>
  <FontAwesomeIcon
    className="edit__roster"
    icon="fa-solid fa-pen-to-square"
  />
</HoverableElement>

<HoverableElement
 tooltipText={"delete"}
 > 
    <FontAwesomeIcon
     className="delete__roster" onClick={click => handleDeleteClick(click, stat)}
      icon="fa-solid fa-trash-can" />
      </HoverableElement>
<HoverableElement tooltipText={"public or private"}>
{
  stat.is_public ? <FontAwesomeIcon className="publish__roster" onClick={click => handlePublish(click, false, stat.id)} icon="fa-solid fa-rectangle-xmark" /> : <FontAwesomeIcon className="publish__roster" onClick={click => handlePublish(click, true, stat.id)} icon="fa-solid fa-share-from-square" />
}</HoverableElement></div>
</div>
}

