

export const RosterList = ({roster, setSelectedRoster}) => {

  const  handleRosterClick = (click) => {
        click.preventDefault()
        setSelectedRoster(roster.id)
}

    return <><button className="Roster__button" onClick={(click) => handleRosterClick(click)}>{roster.name ? `${roster.name}` : `Roster #${roster.id}`}</button></>
}