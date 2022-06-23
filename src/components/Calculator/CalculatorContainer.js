import { CalculatorForm } from "./CalculatorForm"
import { useEffect, useState } from "react"
import {Results} from "./Results"
import { getAllCharacters, getCurrentRoster, getUserRosters } from "../APIManager"
import { RosterList } from "./RosterList"
import { CalculateResults } from "./CalculateResults"
import { newCalculatedRoster } from "../APIManager"


export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([])
    const [userRosters, setUserRosters] = useState([])
    const [rosterChoices, setRosterChoices] = useState([])
    const [selectedRoster, setSelectedRoster] = useState(0)
    const [calculatedRoster, setCalculatedRoster] = useState([])
    const [calculatedRosterId, setCalculatedRosterId] = useState(0)
    const [currentCalcRostName, setCurrentCalcRostName] = useState("")
    const [showResults, setShowResults] = useState(false)


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
        setShowResults(false)
        setCalculatedRoster([])
// setViewResults(false) not sure if it's wise to turn off the display for the results with the same button but it works
    }

    return <> Choose a Roster  <> 
        {userRosters.map((roster) => <RosterList key={roster.id} setSelectedRoster={setSelectedRoster} roster={roster} />)}
        <button onClick={(click) => handleClear(click)}>Clear Roster Choice</button></>

        {selectedRoster && !showResults ?
      <>   <input type="text" onChange={(event) => {setCurrentCalcRostName(event.target.value)}} placeholder="name this roster"></input>
               <div>{rosterChoices.map((rosterChoice) => <CalculatorForm key={rosterChoice.id} calculatedRoster={calculatedRoster} selectedRoster={selectedRoster} setCalculatedRoster={setCalculatedRoster}
                rosterChoice={rosterChoice} characters={characters} />)}</div>

                <CalculateResults setShowResults={setShowResults} currentCalcRostName={currentCalcRostName} 
                calculatedRosterId={calculatedRosterId} newCalculatedRoster={newCalculatedRoster} setCalculatedRosterId={setCalculatedRosterId}
                    localUser={localUser} selectedRoster={selectedRoster} calculatedRoster={calculatedRoster} />
                <>Calculate Results</></>
            : ""}

            {showResults ? <Results showResults={showResults} currentCalcRostName={currentCalcRostName} calculatedRosterId={calculatedRosterId}/>
            : ''}
    </>
}
