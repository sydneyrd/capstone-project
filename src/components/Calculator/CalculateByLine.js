import { useState, useEffect } from "react"
import { CalculateResultsByLine } from "./CalculateResultsByLine"
import { getAllCharacters } from "../APIManager"
import "./calculator.css"


export const CalculateByLine = () => {
  const localRosterUser = localStorage.getItem("roster_user")
const rosterUserObject = JSON.parse(localRosterUser)
const localUser = { ...rosterUserObject }
const [characters, setCharacters] = useState([])
const [calculatedRoster, setCalculatedRoster] = useState([])
const [currentCalcRostName, setCurrentCalcRostName] = useState("")
const [playerStats, setPlayerStats] = useState({
    character: 0,
    damage: 0,
    healing: 0,
    kills: 0,
    deaths: 0,
    assists: 0})
useEffect(
    () => {
        getAllCharacters(setCharacters)
    },
    []
)
const handlePlayerChoice = (event) => {
  const copy = {...playerStats}
  // let getTag = event.currentTarget.getAttribute('data-tag')
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

    return <><input className="roster__name" type="text" onChange={(event) => { setCurrentCalcRostName(event.target.value) }} placeholder="name these results..."></input>
    <CalculateResultsByLine localUser={localUser} calculatedRoster={calculatedRoster} currentCalcRostName={currentCalcRostName}/>
    <div className="parent__div">
      
<div className="player__form">
  <form className="War Statistics">
    <fieldset>
  <input type='text' id='select_Character' list='listid' autoComplete="on" onChange={(event) => {handlePlayerChoice(event)}} />
  <datalist id='listid'>
      {characters.map((c) => <option key={c.id} id={c.id} value={c.character_name}  ></option>)}
  </datalist>  
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
    </fieldset></form></div>

{ calculatedRoster.length ?
          <><div className="player-list">
            {calculatedRoster.map((c) => <div key={c.character} className='player--'> {findCharacter(c).character_name} &nbsp;
            Kills: {c.kills} Deaths: {c.deaths} Assists: {c.assists} Healing: {c.healing} Damage: {c.damage} <button onClick={(click) => {handleRemove(click, c.character)}}>remove</button></div>)}
          </div></>
          : ""}
   </div> </>
}


