

export const RosterList = ({roster, setSelectedRoster, handleRosterChange}) => {

//   const  handleRosterChange = (event) => {
//         event.preventDefault()
//         setSelectedRoster(roster.id)
// }

    return <><option className="Roster__button" key={`select--${roster.id}`} value={roster.id} >{roster.name ? `${roster.name}` : `Roster #${roster.id}`}</option></>
}