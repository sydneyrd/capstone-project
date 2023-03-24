import { Link } from "react-router-dom"
import { deleteCalculatedRoster } from "../managers/CalculatedRosterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react"
import { calculateContext } from "../views/ApplicationViews"
export const WarResultMap = ({ stat, getUserWarStats, setUserWarStats, localUser }) => {
      // Use the useContext hook to access the current value and update function of the second context
const { setCurrentCalculateRoster } = useContext(calculateContext);

  library.add(faTrashCan)

  const handleDeleteClick = (click, stat) => {
    click.preventDefault()
    deleteCalculatedRoster(stat.id)
    .then((res) =>  (
    getUserWarStats()
    )).then(URost => {
    setUserWarStats(URost)})
  }
  return <div className="saved--rosters"><Link onClick={click => setCurrentCalculateRoster(stat.id)}to={`/resources/${stat.id}/view`}><div className="roster__link" to="/roster">{stat.rosterName ? `${stat.rosterName}` : "War Stats"}</div></Link>
    <FontAwesomeIcon className="delete__roster" onClick={click => handleDeleteClick(click, stat)} icon="fa-solid fa-trash-can" />
  </div>

}

