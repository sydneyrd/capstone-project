import {useState, useEffect} from "react"
import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { getAllFactions, getAllRoles, getAllWeapons, getAllServers, saveNewCharacter } from "../APIManager"

export const CharacterForm = () => {
    const [newCharacter, updateNewCharacter] = useState({
        userId: 0,
        name: "",
        roleId: 0,
        primaryId: 0,
        secondaryId: 0,
        serverId: 0,
        factionId: 0
    })
    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [servers, setServers] = useState([])
    const [roles, setRoles] = useState([])
    
    useEffect(
        () => {
            getAllRoles(setRoles)
                
                .then(() => {
                    getAllFactions(setFactions)
                })
                .then (() => {
                    getAllWeapons(setWeapons)
                })
                .then(() => {
                    getAllServers(setServers)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    // const localRosterUser = localStorage.getItem("roster_user")  to assign userID to charactrs, i need the login part
    // const RosterUserObject = JSON.parse(localRosterUser)


    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        let newCharacterToAPI = {
            name: newCharacter.name,
            roleId: newCharacter.roleId,
            primaryId: newCharacter.primaryId,
            secondaryId: newCharacter.secondaryId,
            serverId: newCharacter.serverId,
            factionId: newCharacter.factionId
        }

        // TODO: Perform the fetch() to POST the object to the API
        saveNewCharacter(newCharacterToAPI)

    }
    
    return (
    <>
        <form className="character_form">
            <h2 className="characterForm__title">Add Character</h2>
            <fieldset>

                <label hmtlFor="charactername">Character Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="probably something dumb"
                    value={newCharacter.name} /**onChange{update character state}**/  onChange={
                        (event) => {
                            const copy = {...newCharacter}
                            copy.name = event.target.value
                            updateNewCharacter(copy)
                        }
                    }  />


                <label htmlfor="role">Choose a Role:</label>
                <select   onChange={
    (event) => {
        const copy = {...newCharacter}
        copy.roleId = event.target.value
        updateNewCharacter(copy)
    }
} className="role__select">
                    {roles.map((role) => <RoleSelect key={`${role.id}`} role={role}  />)}
                </select>

                <label hmtlFor="weapon__select">Primary Weapon:</label>
                <select onChange={
                    (event) => {
                        const copy = {...newCharacter}
                        copy.primaryId = event.target.value
                        updateNewCharacter(copy)
                    }
                }className="character__select">

                    {weapons.map((weapon) => <WeaponSelect key={`${weapon.id}`} weapon={weapon} />)}
                </select>
                <label htmlFor="second__weapon">Secondary weapon:</label>
                <select onChange={
                    (event) => {
                        const copy = {...newCharacter}
                        copy.secondaryId = event.target.value
                        updateNewCharacter(copy)
                    }
                }className="character__second">
                    {weapons.map((weapon) => <WeaponSelect key={`${weapon.id}`} weapon={weapon} />)}

                </select>
                <label htmlfor="servers">
                    Server:</label>
                <select onChange={
                    (event) => {
                        const copy = {...newCharacter}
                        copy.serverId = event.target.value
                        updateNewCharacter(copy)
                    }
                }htmlFor="server">
                    {servers.map((server) => <ServerSelect key={`${server.id}`} server={server} />)}
                </select>
                <label htmlfor="factions">Faction:</label>
                
                <select onChange={
                    (event) => {
                        const copy = {...newCharacter}
                        copy.factionId = event.target.value
                        updateNewCharacter(copy)
                    }
                }className="character__select">
                    {factions.map((faction) => <FactionSelect key={`${faction.id}`} faction={faction} />)}
                </select>
                <button onClick={click => handleSaveButtonClick(click)}>Save</button>
            </fieldset>
        </form>
 
    </>
    )
}