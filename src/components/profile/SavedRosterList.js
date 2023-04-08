import { Link } from "react-router-dom"
import { deleteRoster } from "../managers/RosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"
import { HoverableElement } from "./HoverableElement"


export const SavedRosterList = ({roster, getUserRosters, setUserRosters}) => {
    // Use the useContext hook to access the current value and update function of the first context
    const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);
library.add(faTrashCan)
  const handleClick = () => {
    setCurrentEditRoster(roster.id)
  }
  const handleDeleteClick = (click, roster) => {
    click.preventDefault();
  
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this roster? This action can't be undone."
    );
  
    if (userConfirmed) {
      deleteRoster(roster.id)
        .then(() => getUserRosters(setUserRosters));
      alert("Roster successfully deleted");
    }
  };
  return <div className="saved--rosters">< Link className="roster__link" onClick={handleClick} to="/roster">{roster.name ? `${roster.name}` : `Roster #${roster.id}`}
  </Link>
  <HoverableElement tooltipText={"delete"}>
    <FontAwesomeIcon className="delete__roster" onClick={click => handleDeleteClick(click, roster)}icon="fa-solid fa-trash-can"/>
    </HoverableElement>
    </div>
    
}

