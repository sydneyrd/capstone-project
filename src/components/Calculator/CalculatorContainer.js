import { CalculatorForm } from "./CalculatorForm"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
                }).then(
                    getAllCharacters(setCharacters)
                )
                
        },
        []
    )
const handleClear = (click) => {
        click.preventDefault()
        setSelectedRoster(0)
        setCalculatedRoster([])
    }

    return <> <> 
    {!selectedRoster ? <> <> <h3>Select an existing Roster</h3> {userRosters.map((roster) => <RosterList key={roster.id} setSelectedRoster={setSelectedRoster} roster={roster} />)}</>
    <div><Link to="/calculate/new">Create New</Link></div> </>
: ""    
}
        </>
        {selectedRoster ? 
            <>  <button className="clear__button" onClick={(click) => handleClear(click)}>Go Back</button> <input className="roster__name" type="text" onChange={(event) => { setCurrentCalcRostName(event.target.value) }} placeholder="name these results..."></input>
                <CalculateResults currentCalcRostName={currentCalcRostName}
                    calculatedRosterId={calculatedRosterId} newCalculatedRoster={newCalculatedRoster} setCalculatedRosterId={setCalculatedRosterId}
                    localUser={localUser} selectedRoster={selectedRoster} calculatedRoster={calculatedRoster} />
                    <div className="parent__div"> <CalculatorForm calculatedRoster={calculatedRoster} selectedRoster={selectedRoster} 
                setCalculatedRoster={setCalculatedRoster}
                    characters={characters} /></div>

                
                <></></>
                
            : ""}
    </>
}