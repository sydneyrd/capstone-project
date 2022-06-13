import "./roster.css"
import { findServer } from "./Roster.js"


import { useState } from "react"

export const DetailButton = ({ character, servers, roles, weapons, factions }) => {
    const [showText, setShowText] = useState(false)
    const handleMouseEnter = e => {
        e.target.style.background = "grey"
        setShowText(true)
    }
    const handleMouseLeave = e => {
        e.target.style.background = "maroon"
        setShowText(false)
    }

    let rightServer = servers.find(({ id }) => id === character.serverId)
    let rightPrimary = weapons.find(({ id }) => id === character.primaryweapon)
    let rightSecondary = weapons.find(({ id }) => id === character.secondaryweapon)
    let rightFaction = factions.find(({ id }) => id === character.factionId)
    let rightRole = roles.find(({ id }) => id === character.roleId)

    return (<>
        <div className="App">
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="button"
            >
                Hover over me
            </button>
        </div>
        {showText &&
            <section className="message">
                <article className="details">
                    <h3>{character.character}</h3>
                    <p>{rightRole.name}
                        <br></br>
                        Primary Weapon: {rightPrimary.name}
                        <br></br>
                        Secondary Weapon: {rightSecondary.name}
                        <br></br>
                        Server: {rightServer.name}
                        <br></br>
                        Faction: {rightFaction.name}
                    </p>
                </article>
            </section>
        }
    </>
    )
}






























