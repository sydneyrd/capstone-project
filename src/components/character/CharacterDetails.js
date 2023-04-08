import { useNavigate, useParams } from "react-router-dom"
import Modal from "react-modal"
import { useEffect, useState } from "react"
import { RoleSelect } from "./Role"
import { WeaponSelect } from "./WeaponSelect"
import { FactionSelect } from "./FactionSelect"
import { ServerSelect } from "./ServerSelect"
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { getAllFactions, getAllServers, getAllWeapons, getAllRoles } from "../managers/ResourceManager"
import { deleteCharLink, newLink, getCharacterLinks, deleteCharacter, putCharacter, getSingleCharacter } from "../managers/CharacterManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { LinkModal } from "./LinkForm"
export const CharacterDetails = () => {
    const { characterId } = useParams()
    const [character, setCharacter] = useState({
        character_name: "",
        role: 0,
        primary_weapon: 0,
        secondary_weapon: 0,
        faction: 0,
        server: 0,
        notes: "",
        image: "",
        id: parseInt(characterId)
    })
    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [roles, setRoles] = useState([])
    const [servers, setServers] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [characterLinks, setCharacterLinks] = useState([]) //this one is for existing links
    const [notes, setNotes] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()
    library.add(faTrashCan)
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
    useEffect(() => {
        setNotes(character.notes)
    }, [character])
    const apiKey = process.env.REACT_APP_API;
    const handleUpdateClick = (UC, click) => {
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
            .then(() =>
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
            setImage(base64ImageString)
        });
    }

    const handleDeleteClick = (deleteCharacterId, click) => {
        click.preventDefault();
        if (window.confirm("are you sure? action can't be undone")) {
            deleteCharacter(deleteCharacterId).then(() => { navigate("/characters"); });
        }
    }
    

    function handleDeleteLink(id, click) {
        click.preventDefault();
        if (window.confirm("are you sure? action can't be undone")) {
            deleteCharLink(id)
                .then(() => { getCharacterLinks(characterId, setCharacterLinks) })
                .then(() => { });
        }
    }
    
    const handleFormChange = (event) => {
        event.preventDefault()
        const copy = { ...character }
        if (/^\d+$/.test(event.target.value)) {
            copy[event.target.name] = parseInt(event.target.value)
        }
        else { copy[event.target.name] = event.target.value }
        setCharacter(copy)
    }

    return (<main className="main--characterdetails">
        <div className="left--container--details">
            <h1 className="editcharacter__name">{character?.character_name}</h1>
            <form className="edit--character-form">

                <fieldset className="edit__form">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="change name" name="character_name"
                        defaultValue={character?.character_name} onChange={
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
                    <select name='server' value={character.server} onChange={
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

            </form> <div className="note--input"><textarea className="character--notes" rows="4" cols="50" value={notes} onChange={
                (event) => { setNotes(event.target.value) }} />
                <button className='save__note__button' onClick={click => { handleUpdateClick(character, click) }}>Save Notes</button></div></div>
                <div className="vod--links"> 
            <button  className="modal--button" onClick={() => setModalIsOpen(true)}>Add a Vod Link</button>
            <Modal isOpen={modalIsOpen} className="add--vod--modal"
      onRequestClose={() => setModalIsOpen(false)}>
        
<LinkModal setModalIsOpen={setModalIsOpen}   character={character} getCharacterLinks={getCharacterLinks} setCharacterLinks={setCharacterLinks} characterId={characterId} />

      </Modal>

                <ul name='characterLinks'>
                    {characterLinks ? characterLinks.map(link => <li key={`link--${link.id}`}><a href={`${link.link}`} target="_blank"
                        rel="noreferrer" key={`link--${link.id}`}>{link.link}</a>
                        <FontAwesomeIcon className="delete__link" onClick={click => handleDeleteLink(link.id, click)}icon="fa-solid fa-trash-can"/>
                        </li>
                    ) : <></>}
                </ul> 
        </div>
        <div className="right--container--details">
            <div className="image--detail">
           
            {character.image ? <img src={`${apiKey}
${character?.image}`} alt={`${character.character_name} picture`}></img> : <></>}<div> 
                <input type="file" id="image" onChange={createCharacterImageString} />
                <input type="hidden" name="character_id" value={character.id} />
                <button className="save__button" onClick={click => handleUpdateClick(character, click)}>save image</button>
            </div></div>
            
            
        </div>
    </main>
    )
}

