import { CharacterForm } from "./CharacterForm"
import { ManageCharacters } from "./ManageCharacters"
import { SearchCharacters } from "./SearchCharacters"
import { getAllFactions, getAllRoles, getAllWeapons, getAllServers } from "../managers/ResourceManager"
import { getCharactersBySearch } from "../managers/CharacterManager"
import {getUserCharacters} from "../managers/UserManager"
import { useState, useEffect } from "react"

export const Character = () => {
    const localRosterUser = localStorage.getItem("roster_user")
    
    const [RosterUserObject, setRosterUserObject] = useState(JSON.parse(localRosterUser))
    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [servers, setServers] = useState([])
    const [roles, setRoles] = useState([])
    const [feedback, setFeedback] = useState("")
    const [userCharacters, updateUserCharacters] = useState([])
    const [searchWords, setSearch] = useState("")
    const [sortedCharacters, setSortedCharacters] = useState([])

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
                    getUserCharacters(RosterUserObject)
                        .then((charArr) =>
                            updateUserCharacters(charArr))
                })
        },
        [RosterUserObject] 
    )
    useEffect(
        () => {
            !searchWords ? setSortedCharacters(userCharacters) :
            getCharactersBySearch(searchWords).then(res => (setSortedCharacters(res))) //searching ALL characters, not just user characters rip
        },
        [searchWords]

    )
    useEffect(
        () => {
            setSortedCharacters(userCharacters)
        },
        [userCharacters]  //this is here to keep the usercharacters in the sorted array which is the one being mapped to create the character cards, also used for searching
        
    )
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
    return <>
        <CharacterForm factions={factions} setFactions={setFactions} RosterUserObject={RosterUserObject} getUserCharacters={getUserCharacters} updateUserCharacters={updateUserCharacters} weapons={weapons} setWeapons={setWeapons} servers={servers} roles={roles} feedback={feedback} setFeedback={setFeedback} />
        <h2 className="characterForm__title">Manage Characters</h2>
        <div><SearchCharacters setSearch={setSearch} searchWords={searchWords} /></div>
        <section className="edit_characters">

            <ManageCharacters RosterUserObject={RosterUserObject} feedback={feedback} sortedCharacters={sortedCharacters} updateUserCharacters={updateUserCharacters} setFeedback={setFeedback}
                weapons={weapons} servers={servers} roles={roles} factions={factions} /></section>
    </>
}
