  import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"

export const SavedRosters = ({}) => {


    const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);

library.add(faTrashCan)
  const handleClick = () => {
    setCurrentEditRoster(roster.id)
  }
  const handleDeleteClick = (click, roster) => {
  alert("successfully deleted")
    click.preventDefault()
    deleteRoster(roster.id).then(()=>getUserRosters() )
        .then((URost) => {
          setUserRosters(URost)
        })
  }
        
  return <div className="saved--rosters">< Link className="roster__link" onClick={handleClick} to="/roster">{roster.name ? `${roster.name}` : `Roster #${roster.id}`}
  </Link>
    <FontAwesomeIcon className="delete__roster" onClick={click => handleDeleteClick(click, roster)}icon="fa-solid fa-trash-can"/></div>
    
}

