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
    const handleValueChange = (e) => {
        e.preventDefault()
        const copy = {...character}
        copy[e.target.name] = parseInt(e.target.value)
        setCharacter(copy)
      }

    return (<>
        <form className="character_form">
            <fieldset className="edit__form">
                <h4 className="editcharacter__name">{character?.character_name}</h4>
                <input
                    type="text"
                    className="form-control"
                    placeholder="change name"
                    value={character?.character_name} onChange={
                        (event) => {
                            const copy = { ...character }
                            copy.character_name = event.target.value
                            setCharacter(copy)
                        }
                    } />
                <label htmlFor="role__name">{rightRole?.name}</label>
                <select name='role' value={character.role} onChange={ 
                    (event) => {
                        handleValueChange(event)
                    }
                } className="role__select">
                    {roles.map((role) => <RoleSelect key={`role--${role?.id}`} role={role} />)}
                </select>

                <label htmlFor="primary__name">{rightPrimary?.name}</label>
                <select name="primary_weapon" value={character.primary_weapon} onChange={
                    (event) => {
                        handleValueChange(event)
                    }
                } className="character__select">
                    {weapons.map((weapon) => <WeaponSelect key={`weapon--${weapon?.id}`} weapon={weapon} />)}
                </select>
                <label htmlFor="second__weapon">{rightSecondary?.name}</label>
                <select name='secondary_weapon' value={character.secondary_weapon} onChange={
                    (event) => {
                        handleValueChange(event)
                    }
                } className="character__second">
                    {weapons.map((weapon) => <WeaponSelect key={`{weaponsecond--${weapon?.id}`} weapon={weapon} />)}
                </select>
                <label htmlFor="servers">
                    {rightServer?.name}</label>
                <select name='server' value={character.server}onChange={
                    (event) => {
                        handleValueChange(event)
                    }
                } htmlFor="server">
                    {servers.map((server) => <ServerSelect key={`server--${server?.id}`} server={server} />)}
                </select>
                <label htmlFor="factions">{rightFaction?.name}</label>

                <select name='faction' value={character.faction} onChange={
                    (event) => {
                       handleValueChange(event)
                    }
                } className="character__select">
                    {factions.map((faction) => <FactionSelect key={`faction--${faction?.id}`} faction={faction} />)}
                </select>


                <button className="update__button" onClick={click => handleUpdateClick(character, click)}>Update</button>
                <button className="delete__button" onClick={click => handleDeleteClick(character.id, click)}>Delete</button>
            </fieldset>

        </form>
        <form>
            <input type="url" name="link" value={link.link} onChange={handleChange} placeholder="vod links?" />

            <button className="link__button" onClick={click => handleNewLink(click)}>New Link</button>
            <textarea rows="4" cols="50" value={notes} onChange={
                        (event) => {setNotes(event.target.value)}}/>
            <button className='save__note__button' onClick={click => {handleUpdateClick(character, click)}}>Save Notes</button></form>

        <div name='characterLinks'>
            {characterLinks ? characterLinks.map(link => <div key={`link--${link.id}`}><a href={`${link.link}`} target="_blank"
        rel="noreferrer" key={`link--${link.id}`}>{link.link}</a>
            <button className="delete__link__button" onClick={click => handleDeleteLink(link.id, click)}>Delete VOD Link</button></div>
            ) : <></>}
        </div> 
        <div> <input type="file" id="image" onChange={createCharacterImageString} />
 <input type="hidden" name="character_id" value={character.id} />
 <button className="save__button" onClick={click => handleUpdateClick(character, click)}>save image</button>
</div>
{character.image ? <img src={`http://localhost:8000${character?.image}`}alt={`${character.character_name} picture`}></img> : <></>}

        </>
    )
}

