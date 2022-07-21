import "./roster.css"

export const DetailButton = ({ charId, servers, roles, weapons, factions, showText, characters  }) => {
    let rightCharacter = characters.find(({ id }) => id === charId)
    let rightServer = servers.find(({ id }) => id === rightCharacter?.serverId)
    let rightPrimary = weapons.find(({ id }) => id === rightCharacter?.primaryweapon)
    let rightSecondary = weapons.find(({ id }) => id === rightCharacter?.secondaryweapon)
    let rightFaction = factions.find(({ id }) => id === rightCharacter?.factionId)
    let rightRole = roles.find(({ id }) => id === rightCharacter?.roleId)
    //find all the right details.   charId picked my mouseover and charId usestate, showtext is a boolean for displaying only

    return (<>
        <div className="details--popup">
            {showText &&
                <section className="message" key={rightCharacter?.id}>
                    <article className="details">
                        <h3>{rightCharacter?.character}</h3>
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






























