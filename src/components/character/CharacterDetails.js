import { faInfo, faNoteSticky } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { getSingleCharacter } from "../APIManager"
import { useEffect, useState, useRef } from "react"
import { RoleSelect } from "./Role"
import { WeaponSelect } from "./WeaponSelect"
import { FactionSelect } from "./FactionSelect"
import { ServerSelect } from "./ServerSelect"
import { deleteCharLink } from "../APIManager"
import { getAllFactions, newLink, getCharacterLinks, getAllServers, getAllWeapons, getAllRoles, deleteCharacter, putCharacter } from "../APIManager"
import { click } from "@testing-library/user-event/dist/click"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const CharacterDetails = () => {
    const [character, setCharacter] = useState({})
    const { characterId } = useParams()
    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [roles, setRoles] = useState([])
    const [servers, setServers] = useState([])
    const [link, setLink] = useState({}) //this is for new links
    const [characterLinks, setCharacterLinks] = useState([]) //this one is for existing links
    const [notes, setNotes] = useState('')
    const [image, setImage] = useState('')
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
                }).then(() => {
                    getCharacterLinks(characterId, setCharacterLinks)
                }).then(() => {

                })
        },
        []
    )
//could increase the depth from the server to get all this info attached to character instead of a bunch of .finds
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
            faction: parseInt(UC.faction),
            notes: notes,
            image: image
        }
        putCharacter(letcToAPI, UC.id) 
        .then(()=>
        getSingleCharacter(characterId, setCharacter))
        //push request get char again to refresh 
        // just get the character and set the character again?
        alert('updated')
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    const createCharacterImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setImage(base64ImageString)
        });
    }

    const handleDeleteClick = (deleteCharacterId, click) => {
        click.preventDefault()
        alert("are you sure?  action can't be undone")
        deleteCharacter(deleteCharacterId)

        //reroute to characters list, alert are you sure
    }
function handleDeleteLink(id, click){
    click.preventDefault()
    deleteCharLink(id).then(()=> 
    {getCharacterLinks(characterId, setCharacterLinks)})
    .then(() => {})
} 
    const handleNewLink = (click) => {
        click.preventDefault();
        try {
            let linkCopy = { ...link };
            let urlString = linkCopy.link;
            if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
                urlString = "http://" + urlString;
            }
            linkCopy.link = urlString;
            const myUrl = new URL(urlString);
            console.log("Valid URL:", myUrl);
            newLink(linkCopy).then((res) => {getCharacterLinks(characterId, setCharacterLinks)})
            
        } catch (err) {
            console.error("Invalid URL:", err);
        }
    };

    const handleChange = (e) => {
        const linkCopy = { ...link }
        linkCopy[e.target.name] = e.target.value
        linkCopy["character"] = character?.id
        linkCopy['roster'] = 0;
        setLink(linkCopy)
    }

    return (<>
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
            <input type="url" name="link" onChange={handleChange} placeholder="vod links?" />

            <button className="link__button" onClick={click => handleNewLink(click)}>New Link</button>
            <textarea rows="4" cols="50" placeholder="add notes talk mad shit" defaultValue={character?.notes} onChange={
                        (event) => {
                            setNotes(event.target.value)
                        }
                    }
            /><button className='save__note__button' onClick={click => {handleUpdateClick(character, click)}}>Save Notes</button></form>

        <div name='characterLinks'>
            <></>{characterLinks.map(link => <div key={`link--${link.id}`}><a href={`${link.link}`}  target="_blank"
   rel="noreferrer" key={`link--${link.id}`}>{link.link}</a>
            <button className="delete__link__button" onClick={click => handleDeleteLink(link.id, click)}>Delete VOD Link</button></div>
            )}
        </div> 
        <div> <input type="file" id="image" onChange={createCharacterImageString} />
 <input type="hidden" name="character_id" value={character.id} />
</div>

<img src={`http://localhost:8000${character?.image}`}alt={`${character.character_name} picture`}></img>
        </>
    )
}

