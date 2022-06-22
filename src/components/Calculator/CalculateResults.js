import { click } from "@testing-library/user-event/dist/click"
import { newCalculatedRosterChoices } from "../APIManager"

export const CalculateResults = ({calculatedRoster, currentCalcRostName, newCalculatedRoster, selectedRoster, localUser, setCalculatedRosterId, calculatedRosterId}) => {

    let thisName = currentCalcRostName
    const handleNewRosterId = (click) => {
        click.preventDefault()
    
        let newcalcR = {
            rosterId: selectedRoster,
            userId: localUser.id,
            rosterName: `${thisName}`
        } 
        newCalculatedRoster(newcalcR).then((newRosterObj) => {
            const newIdObj = {...newRosterObj}
             setCalculatedRosterId(newIdObj.id)  //maybe can get rid of this now, watch out and see
            const readyToPostCalculated = calculatedRoster.map((element) => ({...element, calcRosterId: newIdObj.id}))
            Promise.all(readyToPostCalculated.map((r) => { newCalculatedRosterChoices(r) })).then((result) => {
         console.log(result)
   })
        })
        
 
    }
   
   //this needs to go off immediately before the post of all the other objects so that it can be applied to them.  
   
    return <><div>HELLO HELLO HELLO</div>
    <button onClick={(click) => handleNewRosterId(click)}>Click to test post</button></> 
}





