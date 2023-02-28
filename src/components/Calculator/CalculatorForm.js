import { getCurrentRoster } from "../managers/RosterManager"
import { useState, useEffect } from "react"

export const CalculatorForm = ({ characters, selectedRoster, rosterChoice, calculatedRoster, setCalculatedRoster, setCurrentCalcRostName, createNewRoster }) => {
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
          if (selectedRoster)
          {getCurrentRoster(selectedRoster)
                .then((res) => {
                    setRosterChoices(res)
                }) }
        },
        [selectedRoster]
    )
  useEffect(() => {
    if (createNewRoster) {
      setRosterChoices(characters)
    } 
  }, [createNewRoster])  //okay so this isn't working correctly because the characters array is differently formatted than the rosterchoices array since those are join table objects, and these are straight character objects.  so I can create an alternative display for just the drop down or format them so they are the same.  I think I'll do the latter.

const handlePlayerChoice = (event) => {
  const copy = {...playerStats}
  let character = characters.find(character => character.character_name === event.target.value)
  copy.character = character?.id
  setPlayerStats(copy)  
}
const handleSaveAndAdd = (click) => {
  click.preventDefault()
  const copy = { ...playerStats }
  if (calculatedRoster.find(rosterChoices =>  rosterChoices.character === copy.character))
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
<label></label>
<select onChange={(event) => {
            const copy={...playerStats }
            copy.group = parseInt(event.target.value)
            setPlayerStats(copy)
          }} name="number"> <option value={0}>group</option>
  {Array.from({length: 10}, (_, i) => i + 1).map(num => (
    <option value={num}>{num}</option>
  ))}
</select>
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
            Group: {c.group} 
            Kills: {c.kills} Deaths: {c.deaths} Assists: {c.assists} Healing: {c.healing} Damage: {c.damage} <button onClick={(click) => {handleRemove(click, c.character)}}>remove</button></div>)}
          </div></>
          : ""}


    </div>
  </>
}

