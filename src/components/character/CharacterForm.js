import { useState, useEffect } from "react"
import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { saveNewCharacter } from "../managers/CharacterManager"
import "./characters.css"



export const CharacterForm = ({ setModalIsOpen, updateUserCharacters, RosterUserObject, getUserCharacters, roles, weapons, servers, factions, feedback, setFeedback }) => {
    const [newCharacter, setNewCharacter] = useState({
        userId: 0,
        character: "",
        roleId: 0,
        primaryId: 0,
        secondaryId: 0,
        serverId: 0,
        factionId: 0,
        image: ""
    })
    const [image, setImage] = useState("")
    const closeModal = () => {
        setModalIsOpen(false);
      }
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        let newCharacterToAPI = {
            character_name: newCharacter.character,
            role: parseInt(newCharacter.roleId),
            primary_weapon: parseInt(newCharacter.primaryId),
            secondary_weapon: parseInt(newCharacter.secondaryId),
            server: parseInt(newCharacter.serverId),
            faction: parseInt(newCharacter.factionId),
            user: RosterUserObject.id,
            image:image
        }
        saveNewCharacter(newCharacterToAPI).then(() => {
            getUserCharacters(RosterUserObject)
                .then((charArr) =>
                    updateUserCharacters(charArr))
        })
        setFeedback("Character successfully added")
    }
    const handleChange = (e) => {
        e.preventDefault()
        const copy = { ...newCharacter }
        if (/^\d+$/.test(e.target.value)){
            copy[e.target.name] = parseInt(e.target.value)
        }
        else {copy[e.target.name] = e.target.value}
        setNewCharacter(copy)
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
    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <button className="close-button" onClick={closeModal}>X</button>
            <form className="addcharacter_form">
                <h2 className="characterForm__title">Add Character</h2>
                <fieldset className="add__form">
                    <label htmlFor="charactername">Character Name:</label>
                    <input
                        name='character'
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="probably something dumb"
                        value={newCharacter.character} onChange={
                            (event) => {handleChange(event)
                            }
                        } />
                    <label htmlFor="role">Choose a Role:</label>
                    <select name='roleId' onChange={
                        (event) => {
                            handleChange(event)
                           
                        }
                    } className="role__select">
                        <option value={0}>select a role</option>
                        {roles.map((role) => <RoleSelect key={`role--${role.id}`} role={role} />)}
                    </select>

                    <label hmtlfor="weapon__select">Primary Weapon:</label>
                    <select name='primaryId' onChange={
                        (event) => {
                            handleChange(event)
                          
                        }
                    } className="character__select">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`weaponprime--${weapon.id}`} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">Secondary weapon:</label>
                    <select name='secondaryId' onChange={
                        (event) => {
                            handleChange(event)
                           
                        }
                    } className="character__second">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={`weapon--${weapon.id}`} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        Server:</label>
                    <select name='serverId' onChange={
                        (event) => {
                            handleChange(event)
                       
                        }
                    } htmlFor="server">
                        <option value={0}>select a server</option>
                        {servers.map((server) => <ServerSelect key={`server--${server.id}`} server={server} />)}
                    </select>
                    <label htmlFor="factions">Faction:</label>

                    <select name='factionId' onChange={
                        (event) => {
                            handleChange(event)

                        }
                    } className="character__select">
                        <option value={0}>select a faction</option>
                        {factions.map((faction) => <FactionSelect key={`faction--${faction.id}`} faction={faction} />)}
                    </select>
                    <label htmlFor="image">Character Image:</label>
                    <input type="file" id="image" onChange={createCharacterImageString} />
                <input type="hidden" name="character_id" value={""} />
                    <button className="save__button" onClick={click => handleSaveButtonClick(click)}>Save</button>
                </fieldset>
            </form>

        </>
    )
}