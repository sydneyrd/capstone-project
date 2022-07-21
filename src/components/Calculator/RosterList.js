

export const RosterList = ({roster, setSelectedRoster}) => {

  const  handleRosterClick = (click) => {
        click.preventDefault()
        setSelectedRoster(roster.id)
}

    return <><button className="Roster__button" onClick={(click) => handleRosterClick(click)}>Roster#{roster.id}</button></>
}