import { CalculatorForm } from "./CalculatorForm"
import { useEffect, useState } from "react"
import { getAllCharacters, getCurrentRoster, getUserRosters } from "../APIManager"
import { RosterList } from "./RosterList"
import { CalculateResults } from "./CalculateResults"
import { newCalculatedRoster } from "../APIManager"
import "./calculator.css"

export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([])
    const [userRosters, setUserRosters] = useState([])
    const [rosterChoices, setRosterChoices] = useState([])
    const [selectedRoster, setSelectedRoster] = useState(0)
    const [calculatedRoster, setCalculatedRoster] = useState([])
    const [calculatedRosterId, setCalculatedRosterId] = useState(0)
    const [currentCalcRostName, setCurrentCalcRostName] = useState("")
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
        setCalculatedRoster([])
    }

    return <> Choose a Roster  <>
    {!selectedRoster ?  <> {userRosters.map((roster) => <RosterList key={roster.id} setSelectedRoster={setSelectedRoster} roster={roster} />)}</>
: ""    
}
        
       <button onClick={(click) => handleClear(click)}>Clear Roster Choice</button></>
 
        {selectedRoster ?
            <>   <input className="roster__name" type="text" onChange={(event) => { setCurrentCalcRostName(event.target.value) }} placeholder="name this roster"></input>
                <div className="parent__div">{rosterChoices.map((rosterChoice) => <CalculatorForm key={rosterChoice.id} calculatedRoster={calculatedRoster} selectedRoster={selectedRoster} 
                setCalculatedRoster={setCalculatedRoster}
                    rosterChoice={rosterChoice} characters={characters} />)}</div>

                <CalculateResults currentCalcRostName={currentCalcRostName}
                    calculatedRosterId={calculatedRosterId} newCalculatedRoster={newCalculatedRoster} setCalculatedRosterId={setCalculatedRosterId}
                    localUser={localUser} selectedRoster={selectedRoster} calculatedRoster={calculatedRoster} />
                <></></>
                
            : ""}
    </>
}