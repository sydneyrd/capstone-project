import { Calculator } from "./Calculator"
import { useEffect, useState } from "react"
//lets get the roster Id from the link on the list of saved rosters same way we do on the roster page
import { getAllCharacters, getCurrentRoster } from "../APIManager"

export const CalculatorContainer = () => {
    const [characters, setCharacters] = useState([])
    const [rosterCharacters, setRosterCharacters] = useState([])
    const [rosterChoices, setRosterChoices] = useState([])
    let rosterID = localStorage.getItem("roster_id") //need this to find the right roster
    let rosterIDNUMBER = JSON.parse(rosterID)

    useEffect(
        () => {
            getCurrentRoster(rosterIDNUMBER)
                .then((res) => {
                    setRosterChoices(res)
                })
                .then(() => {
                    getAllCharacters(setCharacters)
                }
                )
        },
        []
    )


return <><div>{rosterChoices.map((rosterChoice) => <Calculator key={rosterChoice.id} rosterChoice={rosterChoice} characters={characters} />)}</div>
    </>
}