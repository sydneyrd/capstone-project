import { getCurrentRoster } from "../managers/RosterManager"
import { useState, useEffect } from "react"



export const CalculatorForm = ({ characters, selectedRoster, calculatedRoster, setCalculatedRoster, createNewRoster }) => {
  const [rosterChoices, setRosterChoices] = useState([])
  const [allChoices, setAllChoices] = useState([])

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
  }, [createNewRoster]) 

const handleSaveAndAdd = (click) => {
  click.preventDefault();

  const copy = { ...playerStats };
  const hasZeroValue =
    copy.kills === 0 ||
    copy.deaths === 0 ||
    copy.assists === 0 ||
    copy.healing === 0 ||
    copy.damage === 0;

  if (calculatedRoster.find((rosterChoices) => rosterChoices.character === copy.character)) {
    alert("You've already added this character");
  } else if (copy.character === 0) {
    window.alert("Please select a character");
  } else if (hasZeroValue && !window.confirm("You have entered zero for one or more stats. Are you sure you want to save?")) {
    // User did not confirm saving with zero values
  } else {
    setCalculatedRoster((state) => [...state, copy]);
  }
};

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
  e.preventDefault();
  const copy = {...playerStats}
  copy[e.target.name] = parseInt(e.target.value)
  setPlayerStats(copy)
}
const handleChangeExistingRosterPlayer = (e) => {
  e.preventDefault();
  let copy = { ...playerStats };
  const [characterId, group] = e.target.value.split(",");
  copy[e.target.name] = parseInt(characterId);
  copy.group = parseInt(group);
  setPlayerStats(copy);
};

  return <>
   
    <div className="player__form">
      <form className="War Statistics">
        <fieldset>

    { rosterChoices && !createNewRoster ?
      <select name='character' onChange={(e)=>{handleChangeExistingRosterPlayer(e)}}>
        <option value={0}>select a character</option>
        {rosterChoices.map((c) => <option key={c.id} value={`${c?.character?.id},${c.group}`} >{c?.character?.character_name}</option>)}
    </select>   
    : "" }
    { allChoices.length && createNewRoster ?
    <><select name='character' onChange={(e)=>{handleChange(e)}}>
      <option value={0}>select a character</option>
        {allChoices.map((c) => <option key={c.id} id={c.id} value={c?.id}  >{c?.character_name}</option>)}</select>
        <select onChange={(event) => { 
            handleChange(event)
          }} name="group"> <option value={0}>group</option>
  {Array.from({length: 10}, (_, i) => i + 1).map(num => (
    <option value={num}>{num}</option>
  ))}
</select></>
        : "" }
          <input onChange={(event) => {
            handleChange(event)
          }} className="form-controlstat"
            placeholder="kills"
            name="kills"
            type="number">
          </input>
          <input className="form-controlstat"
            placeholder="deaths"
            type="number"
            name="deaths" onChange={(event) => {
              handleChange(event)
            }}></input>  <input className="form-controlstat"
              placeholder="assists"
              type="number"
              name="assists" onChange={(event) => {
                handleChange(event)
              }}></input>
          <input className="form-controlstat"
            placeholder="healing"
            type="number"
            name="healing" onChange={(event) => {
              handleChange(event)
            }}></input>
          <input className="form-controlstat"
            placeholder="damage"
            type="number" 
            name="damage"
            onChange={(event) => {
              handleChange(event)
            }}></input>
          <button className="save--and--add" onClick={(click) => {handleSaveAndAdd(click)}}>Save and Add</button>
          <br></br>
        </fieldset></form>
        <hr class="custom-line-break" />
        
        { calculatedRoster.length ?
          <><div className="player__list">
            {calculatedRoster.map((c) => <div key={c.character} className='player--stats'>
               <span>{findCharacter(c).character_name} </span>
              <span>
            Group: {c.group} </span>
            <span>
            Kills: {c.kills}</span> 
            <span>Deaths: {c.deaths}</span>
            <span> Assists: {c.assists}</span>
            <span> Healing: {c.healing}</span>
            <span> Damage: {c.damage}</span> <button className="remove--button" onClick={(click) => {handleRemove(click, c.character)}}>remove</button></div>)}
          </div></>
          : ""}


    </div>
  </>
}

