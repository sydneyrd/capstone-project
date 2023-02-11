import { getCurrentRoster } from "../APIManager"
import { useState, useEffect } from "react"

export const CalculatorForm = ({ characters, selectedRoster, rosterChoice, calculatedRoster, setCalculatedRoster, setCurrentCalcRostName }) => {
  const [rosterChoices, setRosterChoices] = useState([])
  let rightCharacter = characters.find(({ id }) => id === rosterChoice?.character?.character?.id)
  const [playerStats, setPlayerStats] = useState({
    character: rightCharacter?.id,
    damage: 0,
    healing: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    group: 0,
  })
  useEffect(
        () => {
            
            getCurrentRoster(selectedRoster)
                .then((res) => {
                    setRosterChoices(res)
                })
        },
        [selectedRoster]
    )
  // const addPlayerToEnd = (c) => {
  //   const copy = { ...playerStats }
  //   const noRepeats = calculatedRoster.filter((playerId) => (playerId.character !== copy.character)) //originially only in the useeffect, i'm just trying shit, the set calc one at a time is the ONLY thing I need here
  //   setCalculatedRoster(noRepeats)
  //   setCalculatedRoster(state => [...state, c])//only adding one object to an array usestate
  // }

const handlePlayerChoice = (event) => {
  const copy = {...playerStats}
  let character = characters.find(character => character.character_name === event.target.value)
  copy.character = character?.id
  setPlayerStats(copy)  
}
const handleSaveAndAdd = (click) => {
  click.preventDefault()
  const copy = { ...playerStats }
  if (calculatedRoster.find(rosterChoices =>  rosterChoices.character?.character?.id === copy.character))
  { alert("You've already added this character")}
  else {setCalculatedRoster(state => [...state, copy])}
  //only adding one object to an array usestate
  let list = document.getElementById('select_Character')
  list.value = ''
}
const handleRemove = (click, charId) => {
  click.preventDefault()
  const index = calculatedRoster.findIndex(object => {
    return object.character === charId;
  })
  const copyRoster = [ ...calculatedRoster ]
  copyRoster.splice(index, 1);
  setCalculatedRoster(copyRoster)
}
const findCharacter = (c) => {
  let character = characters.find(character => character.id === c.character)
return character}
  return <>
    <div className="player__form">
      <form className="War Statistics">
        <></>
        <fieldset>
        

  <input type='text' id='select_Character' list='listid' autoComplete="on" onChange={(event) => {handlePlayerChoice(event)}} />
  {/* <datalist id='listid'>
      {rosterChoices.map((c) => <option key={c.id} id={c.id} value={c?.character?.character_name}  ></option>)}
  </datalist>   */}
  <datalist id='listid'>
  {rosterChoices.map((c) => (
    <option key={c.id} value={c?.character?.character_name} />
  ))}
</datalist>
          <div></div>
          <input className="form-control-stat" 
          placeholder='group number'
          type='number'

          onChange={(event) => {
            const copy={...playerStats }
            copy.group = parseInt(event.target.value)
            setPlayerStats(copy)
          }}>

          </input>
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
          <button onClick={(click) => {handleSaveAndAdd(click)}}>Save and Add Another</button>
          <br></br>
        </fieldset></form>
        
        { calculatedRoster.length ?
          <><div className="player__list">
            {calculatedRoster.map((c) => <div key={c.character} className='player--'> {findCharacter(c).character_name} &nbsp;
            Kills: {c.kills} Deaths: {c.deaths} Assists: {c.assists} Healing: {c.healing} Damage: {c.damage} <button onClick={(click) => {handleRemove(click, c.character)}}>remove</button></div>)}
          </div></>
          : ""}


    </div>
  </>
}

