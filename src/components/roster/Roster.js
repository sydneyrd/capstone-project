import { getAllCharacters, getAllRoles, getAllFactions, getAllWeapons, getAllServers } from "../APIManager"
import { CharacterList } from "./CharacterList"
import { useEffect, useState } from "react"
import { RosterGrid } from "./RosterGrid"
import { ListContainer } from "./ListContainer"
import "./roster.css"

export const Roster = () => {
const [characters, setCharacters] = useState([])
const [servers, setServers] = useState([])
const [weapons, setWeapons] = useState([])
const [factions, setFactions] = useState([])
const [roles, setRoles] = useState([])
const [showText, setShowText] = useState(false)

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
    [] // When this array is empty, you are observing initial component state
)
const [selectCharacter, setCharacter] = useState({
    "id": 0,
    "userId": 0,
    "character": "",
    "roleId": 0,
    "primaryweapon": 0,
    "secondaryweapon": 0,
    "serverId": 0,
    "factionId": 0
})


     
    const resetChar = () => {
     const reset = {  "id": 0,
        "userId": 0,
        "character": "",
        "roleId": 0,
        "primaryweapon": 0,
        "secondaryweapon": 0,
        "serverId": 0,
        "factionId": 0}
        
        setCharacter(reset)
    }
    



// const result = inventory.find( ({ name }) => name === 'cherries' );

    return <><h1>THIS IS WHERE YOU WILL BUILD THE ROSTER  saved rosters link, and build roster link?</h1>
    <ListContainer  showText={showText} selectCharacter={selectCharacter} setShowText={setShowText} resetChar={resetChar} setCharacter={setCharacter} characters={characters} servers={servers} weapons={weapons} factions={factions} roles={roles}/>
  
   <RosterGrid />
    </>
} 

/* {} */

