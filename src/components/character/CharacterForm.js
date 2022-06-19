import { useState, useEffect } from "react"
import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { getAllFactions, getAllRoles, getAllWeapons, getAllServers, saveNewCharacter } from "../APIManager"
import "./characters.css"


//iterate this form and make the default values the character values in the database.  
// leave this form blank to create new characters and display other characters below




export const CharacterForm = ({roles, weapons, servers, factions, feedback, setFeedback}) => {
    const [newCharacter, updateNewCharacter] = useState({
        userId: 0,
        character: "",
        roleId: 0,
        primaryId: 0,
        secondaryId: 0,
        serverId: 0,
        factionId: 0
    })

     const localRosterUser = localStorage.getItem("roster_user")  
     const RosterUserObject = JSON.parse(localRosterUser)

const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        let newCharacterToAPI = {
            character: newCharacter.character,
            roleId: parseInt(newCharacter.roleId),
            primaryId: parseInt(newCharacter.primaryId),
            secondaryId: parseInt(newCharacter.secondaryId),
            serverId: parseInt(newCharacter.serverId),
            factionId: parseInt(newCharacter.factionId),
            userId: RosterUserObject.id
        }

        

        // TODO: Perform the fetch() to POST the object to the API
        saveNewCharacter(newCharacterToAPI)
            .then(() => {
                setFeedback("Character successfully added")
            }
            )

    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="character_form">
                <h2 className="characterForm__title">Add Character</h2>
                <fieldset className="add__form">

                    <label htmlFor="charactername">Character Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="probably something dumb"
                        value={newCharacter.character} /**onChange{update character state}**/ onChange={
                            (event) => {
                                const copy = { ...newCharacter }
                                copy.character = event.target.value
                                updateNewCharacter(copy)
                            }
                        } />


                    <label htmlFor="role">Choose a Role:</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...newCharacter }
                            copy.roleId = event.target.value
                            updateNewCharacter(copy)
                        }
                    } className="role__select">
                        <option value={0}>select a role</option>
                        {roles.map((role) => <RoleSelect key={`role--${role.id}`} role={role} />)}
                    </select>

                    <label hmtlfor="weapon__select">Primary Weapon:</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...newCharacter }
                            copy.primaryId = event.target.value
                            updateNewCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`weaponprime--${weapon.id}`} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">Secondary weapon:</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...newCharacter }
                            copy.secondaryId = event.target.value
                            updateNewCharacter(copy)
                        }
                    } className="character__second">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`weapon--${weapon.id}`} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        Server:</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...newCharacter }
                            copy.serverId = event.target.value
                            updateNewCharacter(copy)
                        }
                    } htmlFor="server">
                        <option value={0}>select a server</option>
                        {servers.map((server) => <ServerSelect key={`server--${server.id}`} server={server} />)}
                    </select>
                    <label htmlFor="factions">Faction:</label>

                    <select onChange={
                        (event) => {
                            const copy = { ...newCharacter }
                            copy.factionId = event.target.value
                            updateNewCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a faction</option>
                        {factions.map((faction) => <FactionSelect key={`faction--${faction.id}`} faction={faction} />)}
                    </select>
                    <button className="save__button" onClick={click => handleSaveButtonClick(click)}>Save</button>
                </fieldset>
            </form>

        </>
    )
}