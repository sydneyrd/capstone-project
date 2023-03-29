import { CalculatorForm } from "./CalculatorForm"
import { useEffect, useState } from "react"
import { getAllCharacters} from "../managers/CharacterManager"
import {getUserRosters} from  "../managers/UserManager"
import { RosterList } from "./RosterList"
import { CalculateResults } from "./CalculateResults"
import { newCalculatedRoster } from "../managers/CalculatedRosterManager"
import "./calculator.css"


export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([])
    const [userRosters, setUserRosters] = useState([])
    // const [rosterChoices, setRosterChoices] = useState([]) unused error
    const [selectedRoster, setSelectedRoster] = useState(0)
    //have a state to watch for if a new roster is being created as opposed to using an existing roster
    const [createNewRoster, setCreateNewRoster] = useState(false)
    const [calculatedRoster, setCalculatedRoster] = useState([])
    const [calculatedRosterId, setCalculatedRosterId] = useState(0)
    const [currentCalcRostName, setCurrentCalcRostName] = useState("")
    const localRosterUser = localStorage.getItem("roster_user")
    const rosterUserObject = JSON.parse(localRosterUser)
    const localUser = { ...rosterUserObject }

    useEffect(
        () => {
          getUserRosters(setUserRosters)
            
            .then(() => {getAllCharacters(setCharacters)})
        },
        []
      )

const handleClear = (click) => {
        click.preventDefault()
        setSelectedRoster(0)
        setCreateNewRoster(false)
        setCalculatedRoster([])
    }
    const  handleRosterChange = (event) => {
        event.preventDefault()
        setSelectedRoster(event.target.value)
}

//if no roster is selected, it is showing these options at the top.   when one is selected they are replaced with a go back button and a text input to name the results, when the selectedroster is set to 0 again the menu returns
    return <> <> 
    {!selectedRoster && createNewRoster == false ? <> <> <div className="select--or--new"> <h3>Select an existing Roster <select onChange={(event) => handleRosterChange(event)}><option key="select--0" value={0}>select</option>{userRosters.map((roster) => <RosterList key={roster.id} setSelectedRoster={setSelectedRoster} roster={roster} />)} </select> or <button className="new__roster__button" onClick={(click)=>{setCreateNewRoster(true)}}>Create New</button></h3> </div></>
    </>
: ""    
}
{/* if selected roster is true it pops up the go back and the form */}
        </>
        {selectedRoster || createNewRoster ? 
            <> <div className="back--button"><button className="clear__button" onClick={(click) => handleClear(click)}>Go Back</button> <input className="roster__name" type="text" onChange={(event) => { setCurrentCalcRostName(event.target.value) }} placeholder="name these results..."></input>
                <CalculateResults currentCalcRostName={currentCalcRostName}
                    calculatedRosterId={calculatedRosterId} newCalculatedRoster={newCalculatedRoster} setCalculatedRosterId={setCalculatedRosterId}
                    localUser={localUser} selectedRoster={selectedRoster} calculatedRoster={calculatedRoster} /></div> 
                    <div className="parent__div"> <CalculatorForm createNewRoster={createNewRoster}calculatedRoster={calculatedRoster} selectedRoster={selectedRoster} 
                setCalculatedRoster={setCalculatedRoster}
                    characters={characters} /></div>

                
                <></></>
                
            : ""}
    </>
}