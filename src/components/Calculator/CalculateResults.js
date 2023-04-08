import { useNavigate } from "react-router-dom"
import { newCalculatedRosterChoices } from "../managers/CalculatedRosterManager"

export const CalculateResults = ({ calculatedRoster, currentCalcRostName,
    newCalculatedRoster, selectedRoster, 
    selectedServer,
     setCalculatedRosterId }) => {
    let navigate = useNavigate()

    let thisName = currentCalcRostName
    const handleNewRosterId = (click) => {
        click.preventDefault()
        let newcalcR = {
            roster: selectedRoster,
            rosterName: `${thisName}`,
            server: selectedServer
        }
        newCalculatedRoster(newcalcR).then((newRosterObj) => {
            const newIdObj = { ...newRosterObj }
            setCalculatedRosterId(newIdObj.id)  //maybe can get rid of this now, watch out and see
            const readyToPostCalculated = calculatedRoster.map((element) => ({ ...element, calculated_roster: newIdObj.id }))  //adding the calculatedRosterId as a new property to each element
            Promise.all(readyToPostCalculated.map((r) => { newCalculatedRosterChoices(r) })).then((result) => {
            })
            .then(() => {
                setTimeout(() => {
                    navigate(`/resources/${newIdObj.id}/view`);
                }, "1000") 
            })       
        })
    }
    return <><div className="button__click">
        <button className="calculate__click" onClick={(click) => handleNewRosterId(click)}>Finish</button></div></>
}

