//put data on api
import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { useState } from "react"
import { putCharacter } from "../APIManager"

//create a push and delete call to be used a GET request for only the users characters to be displayed, need to iterate v that form for all of them
//need the arrays of all the options, weapons etc
//updateCharacter handleUpdateClick handleDeleteClick
export const EditCharacter = ({ ownedCharacter, roles, characters, RosterUserObject, weapons, factions, servers, feedback, setFeedback }) => {
    const [updatedCharacter, updateCharacter] = useState({
        "id": ownedCharacter.id,
        "userId": ownedCharacter.userId,
        "character": ownedCharacter.character,
        "roleId": ownedCharacter.roleId,
        "primaryweapon": ownedCharacter.primaryweapon,
        "secondaryweapon": ownedCharacter.secondaryweapon,
        "serverId": ownedCharacter.serverId,
        "factionId": ownedCharacter.factionId
    })

    
    


  

   
    const rightRole = roles.find((r) => r.id === ownedCharacter.roleId)
    const primeWeapon = weapons.find((w) => w.id === ownedCharacter.primaryweapon)
    const secondWeapon = weapons.find((ws) => ws.id === ownedCharacter.secondaryweapon)
    const rightServer = servers.find((s) => s.id === ownedCharacter.serverId)
    const rightFaction = factions.find((f) => f.id === ownedCharacter.factionId)


    const handleUpdateClick = (updatedCharacter, click) => {//userId
        click.preventDefault()

        putCharacter(updatedCharacter) //push request
        setFeedback("Character Updated")
        //reload area to display updated character info?

    }
    return (
        <> <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
            <form className="character_form">
                <h2 className="characterForm__title">Edit Characters</h2>
                <fieldset>
                    <label hmtlFor="charactername">{ownedCharacter.character}</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="change name"
                        value={ownedCharacter.character} /**onChange{update character state}**/ onChange={
                            (event) => {
                                const copy = { ...updatedCharacter }
                                copy.character = event.target.value
                                updateCharacter(copy)
                            }
                        } />
                    <label></label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.roleId = event.target.value
                            updateCharacter(copy)
                        }
                    } className="role__select">
                        <option value={0}>select a role</option>
                        {roles.map((role) => <RoleSelect key={`${role.id}`} role={role} />)}
                    </select>

                    <label hmtlFor="weapon__select">{<></>}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.primaryId = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`${weapon.id}`} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">{<></>}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.secondaryweapon = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__second">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`${weapon.id}`} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        {<></>}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.serverId = event.target.value
                            updateCharacter(copy)
                        }
                    } htmlfor="server">
                        <option value={0}>select a server</option>
                        {servers.map((server) => <ServerSelect key={`${server.id}`} server={server} />)}
                    </select>
                    <label htmlFor="factions">{<></>}</label>

                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.factionId = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a faction</option>
                        {factions.map((faction) => <FactionSelect key={`${faction.id}`} faction={faction} />)}
                    </select>
                    <button onClick={click => handleUpdateClick(updatedCharacter, click)}>Save</button>
                </fieldset>
            </form>
        </>)
}
