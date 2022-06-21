import { CalculatorForm } from "./CalculatorForm"
import { useEffect, useState } from "react"
//lets get the roster Id from the link on the list of saved rosters same way we do on the roster page
import { getAllCharacters, getCurrentRoster, getUserRosters } from "../APIManager"
import { RosterList } from "./RosterList"
import { CalculateResults } from "./CalculateResults"
import { click } from "@testing-library/user-event/dist/click"

export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([])
    const [userRosters, setUserRosters] = useState([])
    const [rosterChoices, setRosterChoices] = useState([])
    const [selectedRoster, setSelectedRoster] = useState(0)
    const [viewResults, setViewResults] = useState(false)
   

    const rosterID = localStorage.getItem("roster_id") //need this to find the right roster //for now this is fine, but I think it would be better to add clickable elements that assign this number?  
    const rosterIDNUMBER = JSON.parse(rosterID)
    const localRosterUser = localStorage.getItem("roster_user")
    const rosterUserObject = JSON.parse(localRosterUser)
    const localUser = { ...rosterUserObject }
    useEffect(
        () => {
            getUserRosters(localUser)
                .then((URost) => {
                    setUserRosters(URost)
                })
        },
        []
    )
    useEffect(
        () => {
            getCurrentRoster(selectedRoster)
                .then((res) => {
                    setRosterChoices(res)
                })
                .then(() => {
                    getAllCharacters(setCharacters)
                }
                )
        },
        [selectedRoster]
    )
    const handleClear = (click) => {
        click.preventDefault()
        setSelectedRoster(0)
        // setViewResults(false) not sure if it's wise to turn off the display for the results with the same button but it works
    }
    const resultButton = (click) => {
        click.preventDefault()
        setViewResults(true)
    }

    return <> {userRosters.map((roster) => <RosterList key={roster.id} setSelectedRoster={setSelectedRoster} roster={roster} />)}
        <button onClick={(click) => handleClear(click)}>Clear Roster Choice</button>


        <div>{rosterChoices.map((rosterChoice) => <CalculatorForm key={rosterChoice.id} rosterChoice={rosterChoice} characters={characters} />)}</div>
        <div><button onClick={(click) => resultButton(click)}>Calculate</button></div>
        {viewResults ? <CalculateResults /> : ""}</>
}
