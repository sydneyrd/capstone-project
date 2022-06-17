import { getAllCharacters, getAllRoles, getAllFactions, getCurrentRoster, getAllWeapons, getAllServers, newRoster } from "../APIManager"
import { useEffect, useState } from "react"
import { RosterGrid } from "./RosterGrid"
import { ListContainer } from "./ListContainer"
import "./roster.css"
import { FilterContainer } from "./FilterContainer"
import { newRosterChoice } from "../APIManager"



export const Roster = () => {
    const [characters, setCharacters] = useState([])
    const [servers, setServers] = useState([])
    const [weapons, setWeapons] = useState([])
    const [factions, setFactions] = useState([])
    const [roles, setRoles] = useState([])
    const [sortedArr, setSortedArr] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filterButton, setFilterButton] = useState(false)
    const [factionSearch, setFactionSearch] = useState(0)
    const [roleSearch, setRoleSearch] = useState(0)
    const [serverSearch, setServerSearch] = useState(0)
    const [primarySearch, setPrimarySearch] = useState(0)
    const [secondarySearch, setSecondarySearch] = useState(0)
    const [newRosterPicks, setNewRosterPick] = useState([])
    const [editRosterCharacters, setEditCharacters] = useState([])
    
    
     



    useEffect(
        () => {
            getAllCharacters(setCharacters)
                .then(() => {
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
                            getCurrentRoster(setEditCharacters)
                        })
                        
                })
        },
        [] //init get all stuff
    )
    useEffect(
        () => {
            const searchedChar = characters.filter(character => {
                return character.character.toLowerCase().startsWith(searchTerms.toLowerCase())  //make both lowercase so you can always find a match regardless of case
            })
            setSortedArr(searchedChar)
        },
        [searchTerms]
    ) //find what you put into the search bar and set that as sorted
    useEffect(
        () => {
            //  let alphaCharacters = characters.sort((a, b) => a.character.localeCompare(b.character))
            setSortedArr(characters) ///this alphabet sort stopped working????  it's supposed to be alphaCharacters passed into it???? why is everything not working anymore -_-
        },
        [characters]//sort them alphabetically honestly it's just to put the characters into a sorted array because that's where i want them for future sorting
    )
    let rosterID = localStorage.getItem("roster_id") //need this for the new array for the api
    let rosterIDNUMBER = JSON.parse(rosterID)
const handleSave = (click, newRosterPicks) => { //onclickingSave
        click.preventDefault()
            localStorage.removeItem("roster_id")
        const createRosterChoices = (cArr) => {
            let rosterChoiceArr = []
            for (const c of cArr) {  //there might be an easier way idk, this works.   iterating the array of players in roster and uses takes their character id to create a new object
                let right = c.id
                let nC = {
                    rosterId: rosterIDNUMBER,
                    characterId: 0
                }
                if (nC.characterId != right) {
                    nC.characterId = right
                    rosterChoiceArr.push(nC)
                } else { }
            } return rosterChoiceArr
        }
        const rosterToPost = createRosterChoices(newRosterPicks) //calls ^ 
        Promise.all(rosterToPost.map((r) => { newRosterChoice(r) })).then((result) => {//maybe my finest achievment thus far?   promise waits for all the promises to come back in an iterable before resolving
            console.log(result)
        })
        
    }
    return <><h1>THIS IS WHERE YOU WILL BUILD THE ROSTER  saved rosters link, and build roster link?</h1>
        <FilterContainer setFactionSearch={setFactionSearch} filterButton={filterButton} setFilterButton={setFilterButton} searchTerms={searchTerms} setSearchTerms={setSearchTerms}
            setRoleSearch={setRoleSearch} setPrimarySearch={setPrimarySearch} setServerSearch={setServerSearch} setSecondarySearch={setSecondarySearch}
            roleSearch={roleSearch} serverSearch={serverSearch} factionSearch={factionSearch} primarySearch={primarySearch} secondarySearch={secondarySearch}
            setSortedArr={setSortedArr} characters={characters} servers={servers} weapons={weapons} factions={factions} roles={roles} />
        <section className="body">
            <ListContainer setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} characters={sortedArr} servers={servers} weapons={weapons} factions={factions} roles={roles} />
            <button onClick={(click) => { handleSave(click, newRosterPicks) }}>Save Roster</button>
            <div className="parent" >
                <RosterGrid editRosterCharacters={editRosterCharacters} setEditCharacters={setEditCharacters} newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} characters={characters} /></div>
        </section> </>
}
