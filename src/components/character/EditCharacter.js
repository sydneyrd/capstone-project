//put data on api
import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { useState, useEffect } from "react"
import { deleteCharacter, putCharacter } from "../APIManager"
import "./characters.css"

//create a push and delete call to be used a GET request for only the users characters to be displayed, need to iterate v that form for all of them
//need the arrays of all the options, weapons etc
//updateCharacter handleUpdateClick handleDeleteClick
export const EditCharacter = ({ ownedCharacter, roles, characters, RosterUserObject, weapons, factions, servers, feedback, setFeedback }) => {
    let [updatedCharacter, updateCharacter] = useState({
        id: ownedCharacter.id,
        userId: ownedCharacter.userId,
        character: "",
        roleId: ownedCharacter.roleId,
        primaryweapon: ownedCharacter.primaryweapon,
        secondaryweapon: ownedCharacter.secondaryweapon,
        serverId: ownedCharacter.serverId,
        factionId: ownedCharacter.factionId
    })
    let rightServer = servers.find(({ id }) => id === ownedCharacter?.serverId)
    let rightPrimary = weapons.find(({ id }) => id === ownedCharacter?.primaryweapon)
    let rightSecondary = weapons.find(({ id }) => id === ownedCharacter?.secondaryweapon)
    let rightFaction = factions.find(({ id }) => id === ownedCharacter?.factionId)
    let rightRole = roles.find(({ id }) => id === ownedCharacter?.roleId)

    const handleUpdateClick = (UC, click) => {//userId
        click.preventDefault()
        const letcToAPI = {
            id: UC.id,
            userId: parseInt(UC.userId),
            character: UC.character,
            roleId: parseInt(UC.roleId),
            primaryweapon: parseInt(UC.primaryweapon),
            secondaryweapon: parseInt(UC.secondaryweapon),
            serverId: parseInt(UC.serverId),
            factionId: parseInt(UC.factionId)
        }

        putCharacter(letcToAPI) //push request
        setFeedback("Character Updated")
        //reload area to display updated character info?
 }

    const handleDeleteClick = (deleteCharacterId, click) => {
        click.preventDefault(
            deleteCharacter(deleteCharacterId)
        )
    }


    return (
        <> <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
            <form className="character_form">
                 <fieldset className="edit__form">
                    <label >{ownedCharacter.character}</label>
                    <input
                        
                        type="text"
                        className="form-control"
                        placeholder="change name"
                        value={updatedCharacter?.character} /**onChange{update character state}**/ onChange={
                            (event) => {
                                const copy = { ...updatedCharacter }
                                copy.character = event.target.value
                                updateCharacter(copy)
                            }
                        } />
                    <label>{rightRole?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.roleId = event.target.value
                            updateCharacter(copy)
                        }
                    } className="role__select">
                        <option value={0}>select a role</option>
                        {roles.map((role) => <RoleSelect key={role.id} role={role} />)}
                    </select>

                    <label>{rightPrimary?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.primaryweapon = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={weapon.id} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">{rightSecondary?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.secondaryweapon = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__second">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={weapon.id} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        {rightServer?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.serverId = event.target.value
                            updateCharacter(copy)
                        }
                    } htmlFor="server">
                        <option value={0}>select a server</option>
                        {servers.map((server) => <ServerSelect key={server.id} server={server} />)}
                    </select>
                    <label htmlFor="factions">{rightFaction?.name}</label>

                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.factionId = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a faction</option>
                        {factions.map((faction) => <FactionSelect key={faction.id} faction={faction} />)}
                    </select>
                    <button className="update__button" onClick={click => handleUpdateClick(updatedCharacter, click)}>Update</button>
                    <button className="delete__button" onClick={click => handleDeleteClick(updatedCharacter.id, click)}>Delete</button>
                </fieldset>
            </form>
        </>)
}
