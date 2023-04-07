import { Link } from "react-router-dom"
import { deleteCalculatedRoster } from "../managers/CalculatedRosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons"
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { calculateContext } from "../views/ApplicationViews"
import { generateShareRosterToken } from "../managers/UserManager"
import { useState } from "react"
import {HoverableElement }from "./HoverableElement"
import { click } from "@testing-library/user-event/dist/click"
export const WarResultMap = ({ stat, getUserWarStats, setUserWarStats, publishRoster }) => {
      // Use the useContext hook to access the current value and update function of the second context
const { setCurrentCalculateRoster } = useContext(calculateContext);
const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState(null);
    const [newLinkRoster, setNewLinkRoster] = useState({
        rosterName:""
    })
  library.add(faTrashCan, faShareFromSquare, faRectangleXmark, faPenToSquare, faLink)
 let navigate = useNavigate()
 async function generateRosterChoiceUrl(click, roster) { 
  click.preventDefault(); 
  const tokenBody = {
      roster: roster.id}
  const response = await generateShareRosterToken(tokenBody)
  const data = await response.json();
  const token = data.token;
  // Generate the URL
  const url = `${window.location.origin}/shared/roster/${token}`;
  // Set the generated URL
  setGeneratedUrl(url);
  // Show the modal
  setIsShareModalVisible(true);
}
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(generatedUrl);
    alert('URL copied to clipboard');
  } catch (err) {
    alert('Failed to copy the URL');
  }
}
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

      
<HoverableElement tooltipText={`${stat.is_public ? "make private" : "make public"}`}>
{
  stat.is_public ? <FontAwesomeIcon className="publish__roster" onClick={click => handlePublish(click, false, stat.id)} icon="fa-solid fa-rectangle-xmark" /> : <FontAwesomeIcon className="publish__roster" onClick={click => handlePublish(click, true, stat.id)} icon="fa-solid fa-share-from-square" />
}</HoverableElement>

<HoverableElement tooltipText={"generate a link for other users to add characters"}>
  
<FontAwesomeIcon onClick={(click) => generateRosterChoiceUrl(click, stat)}className="link__generate__roster" icon="fa-solid fa-link" /></HoverableElement>
{isShareModalVisible && (
      <div className="modal--share">
        <h3>be careful cutie anyone with access to this link can add their character to your war board.  You can still edit the board later. </h3>
        <input
          type="text"
          readOnly
          value={generatedUrl}
          onClick={() => copyToClipboard()}
        />
        <button onClick={() => setIsShareModalVisible(false)}>Close</button>
      </div>
    )}
</div></div>
}

