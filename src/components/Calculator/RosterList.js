import { getCurrentRoster } from "../APIManager"

export const RosterList = ({roster, setSelectedRoster}) => {

  const  handleRosterClick = (click) => {
        click.preventDefault()
        setSelectedRoster(roster.id)

    }

    return <><button value={roster.id} onClick={(click) => handleRosterClick(click)}>Roster#{roster.id}</button></>
}