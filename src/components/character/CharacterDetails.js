import { faInfo } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { getSingleCharacter } from "../APIManager"
import { useEffect, useState } from "react"
import { RoleSelect } from "./Role"
import { WeaponSelect } from "./WeaponSelect"
import { FactionSelect } from "./FactionSelect"
import { ServerSelect } from "./ServerSelect"
import { getAllFactions, newLink, getAllServers, getAllWeapons, getAllRoles, deleteCharacter, putCharacter } from "../APIManager"
import { click } from "@testing-library/user-event/dist/click"

export const CharacterDetails = () => {
    const [character, setCharacter] = useState({})
    const { characterId } = useParams()
    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [roles, setRoles] = useState([])
    const [servers, setServers] = useState([])
    const [link, setLink] = useState({roster: 0})

    const localRosterUser = localStorage.getItem("roster_user")
    const RosterUserObject = JSON.parse(localRosterUser)

    
    useEffect(
        () => {
            getAllRoles(setRoles)
                .then(() => {
                    getAllFactions(setFactions)
                })
                .then(() => {
                    getAllWeapons(setWeapons)
                })
                .then(() => {
                    getAllServers(setServers)
                })
                .then(() => {
                    getSingleCharacter(characterId, setCharacter)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    
    let rightServer = servers.find(({ id }) => id === character?.server)
    let rightPrimary = weapons.find(({ id }) => id === character?.primary_weapon)
    let rightSecondary = weapons.find(({ id }) => id === character?.secondary_weapon)
    let rightFaction = factions.find(({ id }) => id === character?.faction)
    let rightRole = roles.find(({ id }) => id === character?.role)




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

        putCharacter(letcToAPI, UC.id) //push request get char again to refrssh?
        alert('updated')

    }

    const handleDeleteClick = (deleteCharacterId, click) => {
        click.preventDefault()
        alert("are you sure?  action can't be undone")
            deleteCharacter(deleteCharacterId)
        
         //reroute to characters list, alert are you sure
    }

    const handleNewLink = (click, link) => {
        click.preventDefault()
        newLink(link)
    }
    
const handleChange = (e) => {
    const linkCopy = {...link }
    linkCopy[e.target.name] = e.target.value
    linkCopy["character"] = character?.id
    setLink(linkCopy)
}


    return ( <> Some character details 
    <div>{character?.character_name}</div>
    <div>{rightServer?.name}</div>
    <div>{rightRole?.name}</div>
    <div>{rightPrimary?.name}</div>
    <div>{rightSecondary?.name}</div>
    <div>{rightFaction?.name}</div>
    <div>{character?.character_name}</div>

    
            <form className="character_form">
                <fieldset className="edit__form">
                    <h4 className="editcharacter__name">{character?.character_name}</h4>
                    <input

                        type="text"
                        className="form-control"
                        placeholder="change name"
                        value={character?.character_name} /**onChange{update character state}**/ onChange={
                            (event) => {
                                const copy = { ...character }
                                copy.character_name = event.target.value
                                setCharacter(copy)
                            }
                        } />
                    <label htmlFor="role__name">{rightRole?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...character }
                            copy.role = event.target.value
                            setCharacter(copy)
                        }
                    } className="role__select">
                        <option value={0}>update role</option>
                        {roles.map((role) => <RoleSelect key={`role--${role?.id}`} role={role} />)}
                    </select>

                    <label htmlFor="primary__name">{rightPrimary?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...character }
                            copy.primary_weapon = event.target.value
                            setCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>update weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`weapon--${weapon?.id}`} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">{rightSecondary?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...character }
                            copy.secondary_weapon = event.target.value
                            setCharacter(copy)
                        }
                    } className="character__second">
                        <option value={0}>update weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`{weaponsecond--${weapon?.id}`} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        {rightServer?.name}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...character }
                            copy.server = event.target.value
                            setCharacter(copy)
                        }
                    } htmlFor="server">
                        <option value={0}>update server</option>
                        {servers.map((server) => <ServerSelect key={`server--${server?.id}`} server={server} />)}
                    </select>
                    <label htmlFor="factions">{rightFaction?.name}</label>

                    <select onChange={
                        (event) => {
                            const copy = { ...character }
                            copy.faction = event.target.value
                            setCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>update faction</option>
                        {factions.map((faction) => <FactionSelect key={`faction--${faction?.id}`} faction={faction} />)}
                    </select>


                    <button className="update__button" onClick={click => handleUpdateClick(character, click)}>Update</button>
                    <button className="delete__button" onClick={click => handleDeleteClick(character.id, click)}>Delete</button>
                 </fieldset>
               
            </form>
            <form>
                <input type="url" name="link" onChange={handleChange}placeholder="vod links?"/>
                <button className="new__button" onClick={click => handleNewLink(click, link)}></button></form></>
            


   
    )
}

// getcharacter by Id, display<div>{character?.}</div>