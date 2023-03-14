import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { useState, useEffect } from "react"
import { deleteCharacter, putCharacter} from "../managers/CharacterManager"
import {getUserCharacters} from "../managers/UserManager"
import { Link } from "react-router-dom"
import "./characters.css"

export const EditCharacter = ({  updateUserCharacters, ownedCharacter, roles, RosterUserObject, weapons, factions, servers,  setFeedback }) => {
    let [updatedCharacter, setUpdatedCharacter] = useState({
        id: ownedCharacter.id,
        user: ownedCharacter.user,
        character_name: ownedCharacter.character_name,
        role: ownedCharacter.role,
        primary_weapon: ownedCharacter.primary_weapon,
        secondary_weapon: ownedCharacter.secondary_weapon,
        server: ownedCharacter.server,
        faction: ownedCharacter.faction
    })
    const handleUpdateClick = (UC, click) => {
        click.preventDefault()
        const letcToAPI = {
            character_name: UC.character_name,
            role: parseInt(UC.role),
            primary_weapon: parseInt(UC.primary_weapon),
            secondary_weapon: parseInt(UC.secondary_weapon),
            server: parseInt(UC.server),
            faction: parseInt(UC.faction)
        }
        putCharacter(letcToAPI, UC.id) 
        
    .then(() => 
    getUserCharacters(RosterUserObject))
.then((charArr) => 
updateUserCharacters(charArr))
    setFeedback("Character Updated")
    }

    const handleDeleteClick = (deleteCharacterId, click) => {
        click.preventDefault()
            deleteCharacter(deleteCharacterId)
            .then(() => getUserCharacters(RosterUserObject))
                .then((charArr) =>
                    updateUserCharacters(charArr))
    }
    const handleChange = (event) => {
        event.preventDefault()
        const copy = { ...updatedCharacter }
        if (/^\d+$/.test(event.target.value)){
            copy[event.target.name] = parseInt(event.target.value)
        }
        else {copy[event.target.name] = event.target.value}
        setUpdatedCharacter(copy)
    }

    return (
        <>
            <form className="character_form">
                <fieldset className="edit__form">
                    <h4 className="editcharacter__name">{updatedCharacter?.character_name}</h4>
                    <input
                    name='character_name'
                        type="text"
                        className="form-control"
                        placeholder="change name"
                        defaultValue={ownedCharacter.character_name} /**onChange{update character state}**/ onChange={
                            (event) => {
                            handleChange(event)
                            }
                        } />
                    <label htmlFor="role__name">Role</label>
                    <select name="role" defaultValue={ownedCharacter.role} onChange={
                        (event) => {
                            handleChange(event)
                        }
                    } className="role__select">
                        
                        {roles.map((role) => <RoleSelect key={`role--${role?.id}`} role={role} />)}
                    </select>

                    <label htmlFor="primary__name">Primary Weapon</label>
                    <select name='primary_weapon' value={updatedCharacter.primary_weapon} onChange={
                        (event) => {
                        handleChange(event)
                        }
                    } className="character__select">
                        {weapons.map((weapon) => <WeaponSelect key={`weapon--${weapon?.id}`} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">Secondary Weapon</label>
                    <select name='secondary_weapon' defaultValue={updatedCharacter.secondary_weapon} onChange={
                        (event) => {
                            handleChange(event)
                        }
                    } className="character__second">
                        {weapons.map((weapon) => <WeaponSelect key={`{weaponsecond--${weapon?.id}`} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        Server</label>
                    <select name='server' defaultValue={updatedCharacter.server} onChange={
                        (event) => {
                            handleChange(event)
                        }
                    } htmlFor="server">
                        {servers.map((server) => <ServerSelect key={`server--${server?.id}`} server={server} />)}
                    </select>
                    <label htmlFor="factions">Faction</label>

                    <select name='faction' defaultValue={updatedCharacter.faction} onChange={
                        (event) => {
                            handleChange(event)
                        }
                    } className="character__select">
                        {factions.map((faction) => <FactionSelect key={`faction--${faction?.id}`} faction={faction} />)}
                    </select>
                    <button className="update__button" onClick={click => handleUpdateClick(updatedCharacter, click)}>Update</button>
                    <button className="delete__button" onClick={click => handleDeleteClick(updatedCharacter.id, click)}>Delete</button>
                <Link to={`/character/${ownedCharacter.id}`}>
                            <div  className="details" name="details" value={ownedCharacter.id}>See Details</div>
                        </Link> </fieldset>
               
            </form>
            
        </>)
}
