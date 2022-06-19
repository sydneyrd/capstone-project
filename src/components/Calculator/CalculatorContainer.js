import { Calculator } from "./Calculator"
import { useEffect, useState } from "react"
//lets get the roster Id from the link on the list of saved rosters same way we do on the roster page
import { getAllCharacters, getCurrentRoster } from "../APIManager"

export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([])
    const [rosterCharacters, setRosterCharacters] = useState([])
    const [rosterCharIds, setRosterCharIds] = useState([])
    let rosterID = localStorage.getItem("roster_id") //need this to find the right roster
    let rosterIDNUMBER = JSON.parse(rosterID)
    
    useEffect(
        () => {
            getCurrentRoster(rosterIDNUMBER)
                .then((res) => {
                    setRosterCharIds(res)
                })
                .then(() => {
                    getAllCharacters(setCharacters)
                }
                )
        },
        []
    )
    
    //compare the two arrays and return only the matching values
   
const foundCharacters = characters.filter(element => element.id === (rosterCharIds.map(e => e.characterId === element.id)))



return <><div>{foundCharacters.map((FC) =>  <Calculator key={`character--div${FC.id}`} FC={FC} />)}</div></> 
}