
import { useState, useEffect } from "react"

export const CalculatorForm = ({ characters, selectedRoster, rosterChoice, calculatedRoster, setCalculatedRoster }) => {
  let rightCharacter = characters.find(({ id }) => id === rosterChoice?.characterId)

  const [playerStats, setPlayerStats] = useState({
    characterId: rightCharacter?.id,
    damage: 0,
    healing: 0,
    kills: 0,
    deaths: 0,
    assists: 0
  })

  const addPlayerToEnd = (c) => {
    const copy = { ...playerStats }
    const noRepeats = calculatedRoster.filter((playerId) => (playerId.characterId !== copy.characterId)) //originially only in the useeffect, i'm just trying shit, the set calc one at a time is the ONLY thing I need here
    setCalculatedRoster(noRepeats)
    setCalculatedRoster(state => [...state, c])//only adding one object to an array usestate
  }
  // in src/components/Calculator/CalculateResults.js
  // Line 21:55:  Array.prototype.map() expects a return value from arrow function  array  i just put an extra around playeridcharacterid parenthesis down there
  useEffect(
    () => {
         const copy = { ...playerStats }
    const noRepeats = calculatedRoster.filter((playerId) => (playerId.characterId !== copy.characterId))  //removes the same player from the list before adding it again.//this is not working correctly
    setCalculatedRoster(noRepeats)
    addPlayerToEnd(copy)//need to make sure there is no allowance for repeats in the array before post
    
    },
    [playerStats ]
) 

  return <>
    <div className="player__form">
      <form className="War Statistics">
        <></>
        <fieldset><div>{rightCharacter?.character}</div>
          <input onChange={(event) => {
            const copy = { ...playerStats }
            copy.kills = parseInt(event.target.value)
            setPlayerStats(copy)
          }} className="form-controlstat"
            placeholder="kills"
            type="number">
          </input>
          <input className="form-controlstat"
            placeholder="deaths"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.deaths = parseInt(event.target.value)
              setPlayerStats(copy)
            }}></input>  <input className="form-controlstat"
              placeholder="assists"
              type="number" onChange={(event) => {
                const copy = { ...playerStats }
                copy.assists = parseInt(event.target.value)
                setPlayerStats(copy)
              }}></input>
          <input className="form-controlstat"
            placeholder="healing"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.healing = parseInt(event.target.value)
              setPlayerStats(copy)
            }}></input>
          <input className="form-controlstat"
            placeholder="damage"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.damage = parseInt(event.target.value)
              setPlayerStats(copy)
            }}></input>
          
          <br></br>
        </fieldset></form>
    </div>
  </>
}

