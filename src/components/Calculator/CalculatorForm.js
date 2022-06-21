// i need to render a list of all of the characters in the roster, with input fields next to them, and labels on top telling what they are,
// and on the calculate button press i need to replace the input fields with the calculated statistics.
import { useState, useEffect } from "react"

export const CalculatorForm = ({ characters, rosterChoice }) => {
  const [totalDamage, setTotalDamage] = useState(0)
  const [totalHeals, setTotalHeals] = useState(0)
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [totalKills, setTotalKills] = useState(0)
  const [totals, setTotals] = useState(0)

  let rightName = characters.find(({ id }) => id === rosterChoice?.characterId)


  useEffect(
    () => {

    },
  [totals]
  )

  return <>
    <div>
      <form className="War Statistics">
        <></>
        <fieldset>{totals}<div>{rightName?.character}</div>
          <input className="form-control"
            placeholder="kills"
            type="number" onChange={(input) => {
              setTotals(input.target.value)
            }}>
          </input>
          <input className="form-control"
            placeholder="deaths"
            type="number"></input>  <input className="form-control"
              placeholder="Assists"
              type="number"></input>

          <input className="form-control"
            placeholder="Healing"
            type="number"></input>
          <input className="form-control"
            placeholder="Damage"
            type="number"></input>
        </fieldset></form>
    </div>
  </>
}
