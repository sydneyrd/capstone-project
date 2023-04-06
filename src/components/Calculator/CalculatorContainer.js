import { CalculatorForm } from "./CalculatorForm"
import { useEffect, useState } from "react"
import Prompt from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getAllCharacters} from "../managers/CharacterManager"
import {getUserRosters} from  "../managers/UserManager"
import { RosterList } from "./RosterList"
import { CalculateResults } from "./CalculateResults"
import { newCalculatedRoster } from "../managers/CalculatedRosterManager"
import "./calculator.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";


export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([])
    const [userRosters, setUserRosters] = useState([])
   
    const [selectedRoster, setSelectedRoster] = useState(0)
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
      library.add(faRotateLeft)
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
    
    {!selectedRoster && createNewRoster == false ? <> <> <div className="select--or--new">
        <div className="left--header--select">
             <h3>Choose an existing roster</h3> <h4>characters and groups will be pre-assigned</h4>  <select className="roster__select" onChange={(event) => handleRosterChange(event)}><option key="select--0" value={0}>Saved Rosters</option>{userRosters.map((roster) => <RosterList key={roster.id} setSelectedRoster={setSelectedRoster} roster={roster} />)} </select></div>
<span className="middle--or--lol">or</span>
    <div className="right--header--new"><h3>Choose from all characters</h3><h4>optionally assign groups</h4>
      <button className="new__roster__button" onClick={(click)=>{setCreateNewRoster(true)}}>Create New</button></div></div></>
    </>
: ""    
}
{/* if selected roster is true it pops up the go back and the form */}
        </>
        {selectedRoster || createNewRoster ? 
            <> 
                    <div className="parent__div"><div className="back--button">
                      
                        <Link className="return--link" to={`/resources`}
                        onClick={click => handleClear(click)}>
            
        <FontAwesomeIcon icon="fa-solid fa-rotate-left"  />
            Return to Results</Link>
            <div className="name--save--div">
                        <input className="roster__name" type="text" onChange={(event) => { setCurrentCalcRostName(event.target.value) }} placeholder="name these results..."></input>
                <CalculateResults 
                
                currentCalcRostName={currentCalcRostName}
                    calculatedRosterId={calculatedRosterId} newCalculatedRoster={newCalculatedRoster} setCalculatedRosterId={setCalculatedRosterId}
                    localUser={localUser} selectedRoster={selectedRoster} calculatedRoster={calculatedRoster} /></div></div>  <CalculatorForm createNewRoster={createNewRoster}calculatedRoster={calculatedRoster} selectedRoster={selectedRoster} 
                setCalculatedRoster={setCalculatedRoster}
                    characters={characters} /></div>

                
                <></></>
                
            : ""}
    </>
}