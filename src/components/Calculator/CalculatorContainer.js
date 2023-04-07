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
import { EntryComponent } from "./EntryComponent"
import { getAllServers } from "../managers/ResourceManager"

export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([]);
    const [userRosters, setUserRosters] = useState([]);
   const [servers, setServers] = useState([]);
   const [selectedServer, setSelectedServer] = useState([]);
    const [selectedRoster, setSelectedRoster] = useState(0);
    const [createNewRoster, setCreateNewRoster] = useState(false);
    const [calculatedRoster, setCalculatedRoster] = useState([]);
    const [calculatedRosterId, setCalculatedRosterId] = useState(0);
    const [currentCalcRostName, setCurrentCalcRostName] = useState("");
    useEffect(
        () => {
          getUserRosters(setUserRosters)
            .then(() => {getAllCharacters(setCharacters)}).then(
                () => {getAllServers(setServers)}
            )},[])
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
const handleServerChange = (e) => {
    e.preventDefault();
   setSelectedServer(parseInt(e.target.value));

  }

//if no roster is selected, it is showing these options at the top.   when one is selected they are replaced with a go back button and a text input to name the results, when the selectedroster is set to 0 again the menu returns
    return <> <> 
    
    {!selectedRoster && createNewRoster == false ? <>  <EntryComponent setSelectedRoster={setSelectedRoster} handleRosterChange={handleRosterChange} userRosters={userRosters} setCreateNewRoster={setCreateNewRoster}/></>
    
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
            <select
onChange={handleServerChange}
>
  <option value="0">Select a Server</option>{
  servers.map((server) => <option key={server.id} value={server.id}>{server.name}</option>)
  }</select>
                        <input className="roster__name" type="text" onChange={(event) => { setCurrentCalcRostName(event.target.value) }} placeholder="name these results..."></input>
                <CalculateResults 
                selectedServer={selectedServer}
                currentCalcRostName={currentCalcRostName}
                    calculatedRosterId={calculatedRosterId} newCalculatedRoster={newCalculatedRoster} setCalculatedRosterId={setCalculatedRosterId}
                   selectedRoster={selectedRoster} calculatedRoster={calculatedRoster} /></div></div>  <CalculatorForm 
                   selectedServer={selectedServer}
                   createNewRoster={createNewRoster}calculatedRoster={calculatedRoster} selectedRoster={selectedRoster} 
                setCalculatedRoster={setCalculatedRoster}
                    characters={characters} /></div>

                
                <></></>
                
            : ""}
    </>
}