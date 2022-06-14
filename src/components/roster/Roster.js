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
        [] //init
    )
    useEffect(
        () => {
           
            const searchedChar = characters.filter(character => {
              return  character.character.toLowerCase().startsWith(searchTerms.toLowerCase())  //make both lowercase so you can always find a match regardless of case
            })
            setSortedArr(searchedChar)
        },
        [ searchTerms ]
    )
   
    useEffect(
        () => {
            let alphaCharacters = characters.sort((a, b) => a.character.localeCompare(b.character))
            setSortedArr(alphaCharacters)
        },
        [characters]
    )

    
   

    return <><h1>THIS IS WHERE YOU WILL BUILD THE ROSTER  saved rosters link, and build roster link?</h1>
        <FilterContainer filterButton={filterButton} setFilterButton={setFilterButton} searchTerms={searchTerms} setSearchTerms={setSearchTerms} 
            setSortedArr={setSortedArr} characters={characters} servers={servers} weapons={weapons} factions={factions} roles={roles} />

        <ListContainer characters={sortedArr} servers={servers} weapons={weapons} factions={factions} roles={roles} />

        <RosterGrid />
    </>
}



