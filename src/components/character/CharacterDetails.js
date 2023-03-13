import {useNavigate, useParams } from "react-router-dom"
import { useEffect, useState} from "react"
import { RoleSelect } from "./Role"
import { WeaponSelect } from "./WeaponSelect"
import { FactionSelect } from "./FactionSelect"
import { ServerSelect } from "./ServerSelect"
import { getAllFactions, getAllServers, getAllWeapons, getAllRoles} from "../managers/ResourceManager"
import {deleteCharLink, newLink, getCharacterLinks, deleteCharacter, putCharacter, getSingleCharacter} from "../managers/CharacterManager"

export const CharacterDetails = () => {    
    const { characterId } = useParams()
    const localRosterUser = localStorage.getItem("roster_user")
    const RosterUserObject = JSON.parse(localRosterUser)
    const [character, setCharacter] = useState({
        character_name: "",
        role: 0,
        primary_weapon: 0,
        secondary_weapon: 0,
        faction: 0,
        server: 0,
        notes: "",
        image: "",
        id: parseInt(characterId),
        user: parseInt(RosterUserObject.id)
    })
    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [roles, setRoles] = useState([])
    const [servers, setServers] = useState([])
    const [link, setLink] = useState({
        link: "",
        character: parseInt(characterId)
    }) //this is for new links, I need to add a way for them to be tied to a calculated roster still
    const [characterLinks, setCharacterLinks] = useState([]) //this one is for existing links
    const [notes, setNotes] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()
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
                    getSingleCharacter(characterId, setCharacter);
                    
                }).then(() => {
                    getCharacterLinks(characterId, setCharacterLinks)
                }).then(() => {
                })
        },
        [characterId]
    )
useEffect(()=> {
setNotes(character.notes)
}, [character])

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
        getSingleCharacter(characterId, setCharacter));
        setNotes(character.notes);
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
        deleteCharacter(deleteCharacterId).then(() => {navigate("/characters")})
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
     // i need to be able to assign these to specific calculated rosters
        setLink(linkCopy)
    }
    const handleFormChange = (event) => {
        event.preventDefault()
        const copy = { ...character }
        if (/^\d+$/.test(event.target.value)){
            copy[event.target.name] = parseInt(event.target.value)
        }
        else {copy[event.target.name] = event.target.value}
        setCharacter(copy)
    }

    return (<main className="main--characterdetails">
        <div className="left--container">
            <h4 className="editcharacter__name">{character?.character_name}</h4>
        <form className="edit--character-form">
            
            <fieldset className="edit__form">
                
                <input
                    type="text"
                    className="form-control"
                    placeholder="change name"
                    value={character?.character_name} onChange={
                        (event) => {
                            handleFormChange(event)
                        }
                    } />
                <label htmlFor="role__name">Role</label>
                <select name='role' value={character.role} onChange={ 
                    (event) => {
                        handleFormChange(event)
                    }
                } className="role__select">
                    {roles.map((role) => <RoleSelect key={`role--${role?.id}`} role={role} />)}
                </select>

                <label htmlFor="primary__name">Primary Weapon</label>
                <select name="primary_weapon" value={character.primary_weapon} onChange={
                    (event) => {
                        handleFormChange(event)
                    }
                } className="character__select">
                    {weapons.map((weapon) => <WeaponSelect key={`weapon--${weapon?.id}`} weapon={weapon} />)}
                </select>
                <label htmlFor="second__weapon">Secondary Weapon</label>
                <select name='secondary_weapon' value={character.secondary_weapon} onChange={
                    (event) => {
                        handleFormChange(event)
                    }
                } className="character__second">
                    {weapons.map((weapon) => <WeaponSelect key={`{weaponsecond--${weapon?.id}`} weapon={weapon} />)}
                </select>
                <label htmlFor="servers">
                    Server</label>
                <select name='server' value={character.server}onChange={
                    (event) => {
                        handleFormChange(event)
                    }
                } htmlFor="server">
                    {servers.map((server) => <ServerSelect key={`server--${server?.id}`} server={server} />)}
                </select>
                <label htmlFor="factions">Faction</label>

                <select name='faction' value={character.faction} onChange={
                    (event) => {
                       handleFormChange(event)
                    }
                } className="character__select">
                    {factions.map((faction) => <FactionSelect key={`faction--${faction?.id}`} faction={faction} />)}
                </select>


                <button className="update__button" onClick={click => handleUpdateClick(character, click)}>Update</button>
                <button className="delete__button" onClick={click => handleDeleteClick(character.id, click)}>Delete</button>
            </fieldset>

        </form>
        </div>
        <div className="right--container">
        <form className="input--edit--details">
            <div className="link--input"><input type="url" className="form-control" name="link" value={link.link} onChange={handleChange} placeholder="vod links?" />

            <button className="link__button" onClick={click => handleNewLink(click)}>New Link</button></div>
            <div className="note--input"><textarea className="character--notes" rows="4" cols="50" value={notes} onChange={
                        (event) => {setNotes(event.target.value)}}/>
            <button className='save__note__button' onClick={click => {handleUpdateClick(character, click)}}>Save Notes</button></div>
            </form>

        <ul name='characterLinks'>
            {characterLinks ? characterLinks.map(link => <li key={`link--${link.id}`}><a href={`${link.link}`} target="_blank"
        rel="noreferrer" key={`link--${link.id}`}>{link.link}</a>
            <button className="delete__link__button" onClick={click => handleDeleteLink(link.id, click)}>Delete VOD Link</button></li>
            ) : <></>}
        </ul> 
        <div> <input type="file" id="image" onChange={createCharacterImageString} />
 <input type="hidden" name="character_id" value={character.id} />
 <button className="save__button" onClick={click => handleUpdateClick(character, click)}>save image</button>
</div>
{character.image ? <img src={`http://localhost:8000${character?.image}`}alt={`${character.character_name} picture`}></img> : <></>}
</div>
        </main>
    )
}

