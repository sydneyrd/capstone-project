import { CharacterForm } from "./CharacterForm"
import { ManageCharacters } from "./ManageCharacters"
import { SearchCharacters } from "./SearchCharacters"
import { getAllFactions, getAllRoles, getAllWeapons, getAllServers } from "../managers/ResourceManager"
import { saveNewCharacter, getCharactersBySearch } from "../managers/CharacterManager"
import {getUserCharacters} from "../managers/UserManager"
import { useState, useEffect } from "react"

export const Character = () => {
    const localRosterUser = localStorage.getItem("roster_user")
    const RosterUserObject = JSON.parse(localRosterUser)

    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [servers, setServers] = useState([])
    const [roles, setRoles] = useState([])
    const [feedback, setFeedback] = useState("")
    const [userCharacters, updateUserCharacters] = useState([])
    const [searchWords, setSearch] = useState("")
    const [rendCount, setCount] = useState(0)
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
        [] // When this array is empty, you are observing initial component state
    )
    // useEffect(
    //     () => {
    //         getAllRoles(setRoles)

    //             .then(() => {
    //                 getAllFactions(setFactions)
    //             })
    //             .then(() => {
    //                 getAllWeapons(setWeapons)
    //             })
    //             .then(() => {
    //                 getAllServers(setServers)
    //             })
    //             .then(() => {
    //                 getUserCharacters(RosterUserObject)

    //                     .then((charArr) =>
    //                         updateUserCharacters(charArr))
    //                     .then(() => {
    //                         setSortedCharacters(userCharacters)
    //                     })

    //             })

    //     },
    //     [rendCount] // When this array is empty, you are observing initial component state   i shouldn't be using this rendcount to render lol 
    // )


    useEffect(
        () => {

            // const searchedChar = userCharacters.filter(character => {
            //     return character?.character_name.toLowerCase().startsWith(searchWords.toLowerCase())  //make both lowercase so you can always find a match regardless of case
            // })
            // setSortedCharacters(searchedChar)
            //get the characters that match the search words
            //set the sorted characters to the characters that match the search words
            !searchWords ? setSortedCharacters(userCharacters) :
            getCharactersBySearch(searchWords).then(res => (setSortedCharacters(res)))

        },
        [searchWords]//find what you put into the search bar and set that as sorted  it should be watching this??  
        //but it only changes on the first change why or maybe this is another rerender problem, but i'm calling the array down again it should be what the heck
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
        <CharacterForm setCount={setCount} factions={factions} setFactions={setFactions} RosterUserObject={RosterUserObject} updateUserCharacters={updateUserCharacters} weapons={weapons} setWeapons={setWeapons} servers={servers} roles={roles} feedback={feedback} setFeedback={setFeedback} />
        <h2 className="characterForm__title">Manage Characters</h2>
        <div><SearchCharacters setSearch={setSearch} searchWords={searchWords} /></div>
        <section className="edit_characters">

            <ManageCharacters feedback={feedback} sortedCharacters={sortedCharacters} updateUserCharacters={updateUserCharacters} setFeedback={setFeedback}
                weapons={weapons} servers={servers} roles={roles} factions={factions} /></section>
    </>
}
//PLEASE BE AWARE I CHANGED THE VALUE OF USERCHARACTERS TO THE SORTED CHARACTER ARRAY IN THE MANAGE CHARACTER COMPONENT^^  SHOULD PROBABLY CLEAN THAT UP