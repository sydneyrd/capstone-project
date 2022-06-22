
import { useState, useEffect } from "react"

export const CalculatorForm = ({ characters, selectedRoster, rosterChoice, calculatedRoster, setCalculatedRoster }) => {
  let rightName = characters.find(({ id }) => id === rosterChoice?.characterId)

  const [playerStats, setPlayerStats] = useState({
    name: rightName?.character,
    damage: 0,
    healing: 0,
    kills: 0,
    deaths: 0,
    assists: 0
  })

  const addPlayerToEnd = (c) => {
    setCalculatedRoster(state => [...state, c])//only adding one object to an array usestate
  }

  useEffect(
    () => {
         const copy = { ...playerStats }
    const noRepeats = calculatedRoster.filter((playerId) => playerId.name !== copy.name)  //removes the same player from the list before adding it again.
    setCalculatedRoster(noRepeats)
    addPlayerToEnd(copy)
    
    },
    [playerStats ]
) 

  return <>
    <div>
      <form className="War Statistics">
        <></>
        <fieldset><div>{rightName?.character}</div>
          <input onChange={(event) => {
            const copy = { ...playerStats }
            copy.kills = event.target.value
            setPlayerStats(copy)
          }} className="form-control"
            placeholder="kills"
            type="number">
          </input>
          <input className="form-control"
            placeholder="deaths"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.deaths = event.target.value
              setPlayerStats(copy)
            }}></input>  <input className="form-control"
              placeholder="Assists"
              type="number" onChange={(event) => {
                const copy = { ...playerStats }
                copy.assists = event.target.value
                setPlayerStats(copy)
              }}></input>
          <input className="form-control"
            placeholder="Healing"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.healing = event.target.value
              setPlayerStats(copy)
            }}></input>
          <input className="form-control"
            placeholder="Damage"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.damage = event.target.value
              setPlayerStats(copy)
            }}></input>
          
          <br></br>
        </fieldset></form>
    </div>
  </>
}

