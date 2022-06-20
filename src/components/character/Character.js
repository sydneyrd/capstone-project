import { CharacterForm } from "./CharacterForm"
import { ManageCharacters } from "./ManageCharacters"
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



   useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
 return <>
    <CharacterForm factions={factions} setFactions={setFactions} RosterUserObject={RosterUserObject} updateUserCharacters={updateUserCharacters}weapons={weapons} setWeapons={setWeapons} servers={servers} roles={roles} feedback={feedback} setFeedback={setFeedback}/>
     <h2 className="characterForm__title">Edit Characters</h2>
  <section className="edit_characters">
 
   <ManageCharacters feedback={feedback} userCharacters={userCharacters} updateUserCharacters={updateUserCharacters} setFeedback={setFeedback} 
    weapons={weapons} servers={servers} roles={roles} factions={factions}/></section> 
    </>
}
