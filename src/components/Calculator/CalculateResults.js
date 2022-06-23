import { useNavigate } from "react-router-dom"
import { newCalculatedRosterChoices } from "../APIManager"

export const CalculateResults = ({ calculatedRoster, currentCalcRostName,
    newCalculatedRoster, selectedRoster, localUser, setCalculatedRosterId }) => {
    let navigate = useNavigate()

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
                //to show the grid of results and also turn off the form
            })
            .then(() => {
                navigate(`/resources/${newIdObj.id}/view`)
            })

           
            
        })
    }
    return <><div>HELLO HELLO HELLO</div>
        <button onClick={(click) => handleNewRosterId(click)}>Click to test post</button></>
}