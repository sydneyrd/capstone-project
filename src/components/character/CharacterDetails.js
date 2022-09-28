import { faInfo } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { getSingleCharacter } from "../APIManager"
import { useEffect, useState } from "react"
import { getAllFactions, getAllServers, getAllWeapons, getAllRoles } from "../APIManager"

export const CharacterDetails = () => {
    const [character, setCharacter] = useState({})
    const { characterId } = useParams()
    const [factions, setFactions] = useState([])
    const [weapons, setWeapons] = useState([])
    const [roles, setRoles] = useState([])
    const [servers, setServers] = useState([])

    
    
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
                    getSingleCharacter(characterId, setCharacter)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    
    let rightServer = servers.find(({ id }) => id === character?.server)
    let rightPrimary = weapons.find(({ id }) => id === character?.primary_weapon)
    let rightSecondary = weapons.find(({ id }) => id === character?.secondary_weapon)
    let rightFaction = factions.find(({ id }) => id === character?.faction)
    let rightRole = roles.find(({ id }) => id === character?.role)
    
    return <>Some character details 
    <div>{character?.character_name}</div>
    <div>{rightServer?.name}</div>
    <div>{rightRole?.name}</div>
    <div>{rightPrimary?.name}</div>
    <div>{rightSecondary?.name}</div>
    <div>{rightFaction?.name}</div>
    <div>{character?.character_name}</div>
    </>
}

// getcharacter by Id, display<div>{character?.}</div>