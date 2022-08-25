import "./roster.css"

export const DetailButton = ({ charId, servers, roles, weapons, factions, showText, characters  }) => {
    let rightCharacter = characters.find(({ id }) => id === charId)
    let rightServer = servers.find(({ id }) => id === rightCharacter?.server)
    let rightPrimary = weapons.find(({ id }) => id === rightCharacter?.primary_weapon)
    let rightSecondary = weapons.find(({ id }) => id === rightCharacter?.secondary_weapon)
    let rightFaction = factions.find(({ id }) => id === rightCharacter?.faction)
    let rightRole = roles.find(({ id }) => id === rightCharacter?.role)
    //find all the right details.   charId picked my mouseover and charId usestate, showtext is a boolean for displaying only

    return (<>
        <div className="details--popup">
            {showText &&
                <section className="message" key={rightCharacter?.id}>
                    <article className="details">
                        <h3>{rightCharacter?.character_name}</h3>
                        <>{rightRole?.name}
                            <br></br>
                            {rightPrimary?.name}
                            <br></br>
                            {rightSecondary?.name}
                            <br></br>
                            {rightServer?.name}
                            <br></br>
                            {rightFaction?.name}
                        </>
                    </article>
                </section>
            }</div>
    </>
    )
}






























