import { click } from "@testing-library/user-event/dist/click"
import { newCalculatedRosterChoices } from "../APIManager"

export const CalculateResults = ({ calculatedRoster, setShowResults, currentCalcRostName, 
    newCalculatedRoster, selectedRoster, localUser, setCalculatedRosterId, calculatedRosterId }) => {

    let thisName = currentCalcRostName
    const handleNewRosterId = (click) => {
        click.preventDefault()

        let newcalcR = {
            rosterId: selectedRoster,
            userId: localUser.id,
            rosterName: `${thisName}`
        }
        newCalculatedRoster(newcalcR).then((newRosterObj) => {
            const newIdObj = { ...newRosterObj }
            setCalculatedRosterId(newIdObj.id)  //maybe can get rid of this now, watch out and see
            const readyToPostCalculated = calculatedRoster.map((element) => ({ ...element, calcRosterId: newIdObj.id }))  //adding the calculatedRosterId as a new property to each element
            Promise.all(readyToPostCalculated.map((r) => { newCalculatedRosterChoices(r) })).then((result) => {
                console.log(result)
                setShowResults(true) //to show the grid of results and also turn off the form
            })
        }) }
    return <><div>HELLO HELLO HELLO</div>
        <button onClick={(click) => handleNewRosterId(click)}>Click to test post</button></>
}