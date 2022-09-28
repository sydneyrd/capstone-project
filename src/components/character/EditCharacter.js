//put data on api
import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { useState, useEffect } from "react"
import { deleteCharacter, putCharacter, getUserCharacters } from "../APIManager"
import { Link } from "react-router-dom"
import "./characters.css"

//create a push and delete call to be used a GET request for only the users characters to be displayed, need to iterate v that form for all of them
//need the arrays of all the options, weapons etc
//updateCharacter handleUpdateClick handleDeleteClick
export const EditCharacter = ({ setNeedUpdate, updateUserCharacters, ownedCharacter, roles, characters, RosterUserObject, weapons, factions, servers, feedback, setFeedback }) => {
    let [updatedCharacter, updateCharacter] = useState({
        id: ownedCharacter.id,
        user: ownedCharacter.user,
        character_name: ownedCharacter.character_name,
        role: ownedCharacter.role,
        primary_weapon: ownedCharacter.primary_weapon,
        secondary_weapon: ownedCharacter.secondary_weapon,
        server: ownedCharacter.server,
        faction: ownedCharacter.faction
    })
    let rightServer = servers.find(({ id }) => id === ownedCharacter?.server)
    let rightPrimary = weapons.find(({ id }) => id === ownedCharacter?.primary_weapon)
    let rightSecondary = weapons.find(({ id }) => id === ownedCharacter?.secondary_weapon)
    let rightFaction = factions.find(({ id }) => id === ownedCharacter?.faction)
    let rightRole = roles.find(({ id }) => id === ownedCharacter?.role)

    const handleUpdateClick = (UC, click) => {//userId
        click.preventDefault()
        const letcToAPI = {
            character_name: UC.character_name,
            role: parseInt(UC.role),
            primary_weapon: parseInt(UC.primary_weapon),
            secondary_weapon: parseInt(UC.secondary_weapon),
            server: parseInt(UC.server),
            faction: parseInt(UC.faction)
        }

        putCharacter(letcToAPI, UC.id) //push request
        
    .then(() => 
    getUserCharacters(RosterUserObject))
       //i just put this here to get it to re render the page when I make changes 6/19/this could break things so watch out
.then((charArr) => 
updateUserCharacters(charArr))
    setFeedback("Character Updated")
    }

    const handleDeleteClick = (deleteCharacterId, click) => {
        click.preventDefault()
            deleteCharacter(deleteCharacterId)
        
            .then(() => getUserCharacters(RosterUserObject))
                //i just put this here to get it to re render the page when I make changes 6/19/this could break things so watch out
                .then((charArr) =>
                    updateUserCharacters(charArr))
    }


    return (
        <>
            <form className="character_form">
                <fieldset className="edit__form">
                    <h4 className="editcharacter__name">{ownedCharacter?.character_name}</h4>
                    <input

                        type="text"
                        className="form-control"
                        placeholder="change name"
                        value={updatedCharacter?.character_name} /**onChange{update character state}**/ onChange={
                            (event) => {
                                const copy = { ...updatedCharacter }
                                copy.character_name = event.target.value
                                updateCharacter(copy)
                            }
                        } />
                    <label htmlFor="role__name">{rightRole?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.role = event.target.value
                            updateCharacter(copy)
                        }
                    } className="role__select">
                        <option value={0}>update role</option>
                        {roles.map((role) => <RoleSelect key={`role--${role?.id}`} role={role} />)}
                    </select>

                    <label htmlFor="primary__name">{rightPrimary?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.primary_weapon = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>update weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`weapon--${weapon?.id}`} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">{rightSecondary?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.secondary_weapon = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__second">
                        <option value={0}>update weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`{weaponsecond--${weapon?.id}`} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        {rightServer?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.server = event.target.value
                            updateCharacter(copy)
                        }
                    } htmlFor="server">
                        <option value={0}>update server</option>
                        {servers.map((server) => <ServerSelect key={`server--${server?.id}`} server={server} />)}
                    </select>
                    <label htmlFor="factions">{rightFaction?.name}</label>

                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.faction = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>update faction</option>
                        {factions.map((faction) => <FactionSelect key={`faction--${faction?.id}`} faction={faction} />)}
                    </select>
                    <button className="update__button" onClick={click => handleUpdateClick(updatedCharacter, click)}>Update</button>
                    <button className="delete__button" onClick={click => handleDeleteClick(updatedCharacter.id, click)}>Delete</button>
                <Link to={`/character/${ownedCharacter.id}`}>
                            <div name="details" value={ownedCharacter.id}>See Details</div>
                        </Link> </fieldset>
               
            </form>
            
        </>)
}
