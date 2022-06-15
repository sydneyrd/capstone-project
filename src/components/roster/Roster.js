import { getAllCharacters, getAllRoles, getAllFactions, getAllWeapons, getAllServers } from "../APIManager"
import { CharacterList } from "./CharacterList"
import { useEffect, useState } from "react"
import { RosterGrid } from "./RosterGrid"
import { ListContainer } from "./ListContainer"
import "./roster.css"
import { FilterContainer } from "./FilterContainer"

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
            let alphaCharacters = characters.sort((a, b) => a.character.localeCompare(b.character))
            setSortedArr(alphaCharacters)
        },
        [characters]
    ) //sort them alphabetically honestly it's just to put the characters into a sorted array because that's where i want them for future sorting

    return <><h1>THIS IS WHERE YOU WILL BUILD THE ROSTER  saved rosters link, and build roster link?</h1>
        <FilterContainer setFactionSearch={setFactionSearch} filterButton={filterButton} setFilterButton={setFilterButton} searchTerms={searchTerms} setSearchTerms={setSearchTerms}
            setRoleSearch={setRoleSearch} setPrimarySearch={setPrimarySearch} setServerSearch={setServerSearch} setSecondarySearch={setSecondarySearch}
            roleSearch={roleSearch} serverSearch={serverSearch} factionSearch={factionSearch} primarySearch={primarySearch} secondarySearch={secondarySearch}
            setSortedArr={setSortedArr} characters={characters} servers={servers} weapons={weapons} factions={factions} roles={roles} />
        <body className="body">
            <ListContainer  characters={sortedArr} servers={servers} weapons={weapons} factions={factions} roles={roles} />

            <RosterGrid />
        </body>  </>
}



