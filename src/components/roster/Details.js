import "./roster.css"
import { findServer } from "./Roster.js"


import { useState } from "react"

export const DetailButton = ({ resetChar, character, servers, roles, weapons, factions, showText }) => {


    let rightServer = servers.find(({ id }) => id === character.serverId)
    let rightPrimary = weapons.find(({ id }) => id === character.primaryweapon)
    let rightSecondary = weapons.find(({ id }) => id === character.secondaryweapon)
    let rightFaction = factions.find(({ id }) => id === character.factionId)
    let rightRole = roles.find(({ id }) => id === character.roleId)


    return (<>
        <div className="App">


            {showText &&
                <section className="message" key={character.id}>
                    <article
                    onMouseLeave={resetChar}
                        className="details">
                        <h3>{character.character}</h3>
                        <>{rightRole.name}
                            <br></br>
                            Primary Weapon: {rightPrimary.name}
                            <br></br>
                            Secondary Weapon: {rightSecondary.name}
                            <br></br>
                            Server: {rightServer.name}
                            <br></br>
                            Faction: {rightFaction.name}
                        </>
                    </article>
                </section>
            }</div>
    </>
    )
}






























