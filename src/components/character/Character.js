import { CharacterForm } from "./CharacterForm"
import { ManageCharacters } from "./ManageCharacters"
import {SearchCharacters} from "./SearchCharacters"
import { getAllFactions, getAllCharacters, getAllRoles, getAllWeapons, getAllServers, saveNewCharacter, getUserCharacters } from "../APIManager"
import { useState, useEffect } from "react"
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// import { getLocations, postNewEmployee, postNewUser } from "../APIManager"

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
                  .then(() => {
                   setSortedCharacters(userCharacters) 
                  })
      
                })
               
        },
        [rendCount] // When this array is empty, you are observing initial component state
    )


    useEffect(
        () => {
            
            const searchedChar = userCharacters.filter(character => {
                return character?.character.toLowerCase().startsWith(searchWords.toLowerCase())  //make both lowercase so you can always find a match regardless of case
            })
            setSortedCharacters(searchedChar)
        },
        [searchWords]//find what you put into the search bar and set that as sorted  it should be watching this??  
        //but it only changes on the first change why or maybe this is another rerender problem, but i'm calling the array down again it should be what the heck
    ) 


   useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
 return <>
    <CharacterForm setCount={setCount} factions={factions} setFactions={setFactions} RosterUserObject={RosterUserObject} updateUserCharacters={updateUserCharacters}weapons={weapons} setWeapons={setWeapons} servers={servers} roles={roles} feedback={feedback} setFeedback={setFeedback}/>
     <h2 className="characterForm__title">Edit Characters</h2>
     <div><SearchCharacters setSearch={setSearch} searchWords={searchWords}/></div> 
  <section className="edit_characters">
 
   <ManageCharacters  feedback={feedback} userCharacters={sortedCharacters} updateUserCharacters={updateUserCharacters} setFeedback={setFeedback} 
    weapons={weapons} servers={servers} roles={roles} factions={factions}/></section> 
    </>
}
//PLEASE BE AWARE I CHANGED THE VALUE OF USERCHARACTERS TO THE SORTED CHARACTER ARRAY IN THE MANAGE CHARACTER COMPONENT^^  SHOULD PROBABLY CLEAN THAT UP