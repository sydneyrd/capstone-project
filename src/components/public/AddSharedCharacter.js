import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
    import { RoleSelect } from "../character/Role";
    import { WeaponSelect } from "../character/WeaponSelect";
    import { FactionSelect } from "../character/FactionSelect";
    import { ServerSelect } from "../character/ServerSelect";
    import { getPublicFactions, getPublicServers, getPublicWeapons, getPublicRoles, addSharedCharacter } from "../managers/PublicManager";
    
    import "../character/characters.css"
    import { Link } from "react-router-dom";


export const AddSharedCharacter = () => {
    const { tokenId } = useParams()
    const [factions, setFactions] = useState([])
    const [servers, setServers] = useState([])
    const [weapons, setWeapons] = useState([])
    const [roles, setRoles] = useState([])
const navigate = useNavigate()
        const [newCharacter, setNewCharacter] = useState({
            character: "",
            roleId: 0,
            primaryId: 0,
            secondaryId: 0,
            serverId: 0,
            factionId: 0,
            image: "",
            token: tokenId
        })
        const [image, setImage] = useState("")
    useEffect(() => {
        getPublicFactions(setFactions)
        getPublicServers(setServers)
        getPublicWeapons(setWeapons)
        getPublicRoles(setRoles)
    }, [])

        const handleSaveButtonClick = (event) => {
            event.preventDefault()
            let newCharacterToAPI = {
                character_name: newCharacter.character,
                role: parseInt(newCharacter.roleId),
                primary_weapon: parseInt(newCharacter.primaryId),
                secondary_weapon: parseInt(newCharacter.secondaryId),
                server: parseInt(newCharacter.serverId),
                faction: parseInt(newCharacter.factionId),
                image:image,
                token:tokenId
            }
            if(window.confirm("Are you sure you want to add this character to your friends account?")){addSharedCharacter(newCharacterToAPI, tokenId);}
            window.alert("Character successfully added");
            navigate("/")
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
           
                
                <form className="addcharacter_form">
                <h2 className="characterForm__title--public">Add Character to a Friend's Account</h2>
<article className="add--info"><p>
  You will not be able to make changes to this character after adding.
  If you want to manage your own character please{' '}
  <Link to="/register">register for an account</Link>.
  Your character will still be available for your friend to roster, however only the owner of the account may edit, delete, upload gear images, or link vods for this character.</p>
</article>
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
                        <label htmlFor="image">Gear Image:</label>
                        <input type="file" id="image" onChange={createCharacterImageString} />
                    <input type="hidden" name="character_id" value={""} />
                        <button className="save__button" onClick={click => handleSaveButtonClick(click)}>Save</button>
                    </fieldset>
                </form>
    
            </>
        )
    }
