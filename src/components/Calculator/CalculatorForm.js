import { getCurrentRoster } from "../managers/RosterManager"
import { useState, useEffect } from "react"

export const CalculatorForm = ({ characters, selectedRoster, rosterChoice, calculatedRoster, setCalculatedRoster, setCurrentCalcRostName, createNewRoster }) => {
  const [rosterChoices, setRosterChoices] = useState([])
  const [allChoices, setAllChoices] = useState([])
  let rightCharacter = characters.find(({ id }) => id === rosterChoice?.character?.character?.id)
  const [playerStats, setPlayerStats] = useState({
    character: 0,
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
      setAllChoices(characters)
    } 
  }, [createNewRoster])  //okay so this isn't working correctly because the characters array is differently formatted than the rosterchoices array since those are join table objects, and these are straight character objects.  so I can create an alternative display for just the drop down or format them so they are the same.  I think I'll do the latter.

// const handlePlayerChoice = (event) => {
//   const copy = {...playerStats}
//   let character = characters.find(character => character.character_name === event.target.value)
//   copy.character = character?.id
//   setPlayerStats(copy)  
// }
const handleSaveAndAdd = (click) => {
  click.preventDefault()
  const copy = { ...playerStats }
  if (calculatedRoster.find(rosterChoices =>  rosterChoices.character === copy.character))
  { alert("You've already added this character")}
  else if (copy.character === 0) {window.alert("Please select a character")}
  else if(copy.kills === 0) {window.alert("Please enter a number of kills")}
  else if(copy.deaths === 0) {window.alert("Please enter a number of deaths")}
  else if(copy.assists === 0) {window.alert("Please enter a number of assists")}
  else if(copy.healing === 0) {window.alert("Please enter a number of healing")}
  else if(copy.damage === 0) {window.alert("Please enter a number of damage")}
  else if(copy.character === 0 && copy.group === 0 && copy.kills === 0 && copy.deaths === 0 && copy.assists === 0 && copy.healing === 0 && copy.damage === 0){window.alert("Please select a character and enter stats")}
  else if (calculatedRoster.find(allChoices =>  allChoices.character.id === copy.character))
  {alert("You've already added this character")}
  else
   {setCalculatedRoster(state => [...state, copy])}
  //only adding one object to an array usestate
  // let list = document.getElementById('select_Character')
  // list.value = ''
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
const handleChange = (e) => {
  e.preventDefault()
  const copy = {...playerStats}
  copy.character = parseInt(e.target.value)
  setPlayerStats(copy)
}
  return <>
    <div className="player__form">
      <form className="War Statistics">
        <></>
        <fieldset>
        

    { rosterChoices && !createNewRoster ?
      <select name='character' onChange={(e)=>{handleChange(e)}}>
        <option value={0}>select a character</option>
        {rosterChoices.map((c) => <option key={c.id} id={c.id} value={c?.character?.id}  >{c?.character?.character_name}</option>)}
    </select>   
    : "" }
    { allChoices.length && createNewRoster ?
    <select name='character' onChange={(e)=>{handleChange(e)}}>
      <option value={0}>select a character</option>
        {allChoices.map((c) => <option key={c.id} id={c.id} value={c?.id}  >{c?.character_name}</option>)}</select>
        : "" }
    
    
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

