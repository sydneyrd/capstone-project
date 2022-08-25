import { useState, useEffect } from "react"

import { getAllCharacters } from "../APIManager"


export const CalculateByLine = () => {
const [characters, setCharacters] = useState([])
const [calculatedRoster, setCalculatedRoster] = useState([])
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
  copy.character = event.target.value
  setPlayerStats(copy)  
}
const handleSaveAndAdd = (click) => {
    click.preventDefault()
    const copy = { ...playerStats }
    
     setCalculatedRoster(state => [...state, c])//only adding one object to an array usestate
   
}



    return <div className="calculater_page">OKay we gon have 1 autocomplete text box here first with character name to assign character ID, after that we got ez pz numerical inputs
<div className="form"><input type='text' list='listid' autocomplete="on" onChange={(event) => {handlePlayerChoice(event)}} />
 <datalist id='listid'>
   {characters.map((c) => <option key={c.id} id={c.id} value={c.id} >{c.character_name}</option>)}
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
          <button>Finish Roster</button></div>

{ calculatedRoster.length ?
          <div className="player-list">
            {calculatedRoster.map((c) => <div className='player--'>{c.character_name} {c.kills} {c.deaths} {c.assists} {c.healing} {c.damage}</div>)}
          </div>
          : ""}


</div>    
}


//NEED TO CREATE A NEW CALCULATED ROSTER, THEN ADD ONE BY ONE, UPDATE DISPLAY AS THEY ARE BEING ADDED







// export const CalculateByLine = ({ characters, selectedRoster, rosterChoice, calculatedRoster, setCalculatedRoster }) => {
//   let rightCharacter = characters.find(({ id }) => id === rosterChoice?.character)

//  

//   const addPlayerToEnd = (c) => {
//     
//   // in src/components/Calculator/CalculateResults.js
//   // Line 21:55:  Array.prototype.map() expects a return value from arrow function  array  i just put an extra around playeridcharacterid parenthesis down there
//   useEffect(
//     () => {
//         const copy = { ...playerStats }
//     const noRepeats = calculatedRoster.filter((playerId) => (playerId.character !== copy.character))  //removes the same player from the list before adding it again.//this is not working correctly
//     setCalculatedRoster(noRepeats)
//     addPlayerToEnd(copy)//need to make sure there is no allowance for repeats in the array before post
    
//     },
//     [playerStats ]
// ) 



