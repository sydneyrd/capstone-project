
import { useState, useEffect } from "react"
import { getUserCharacters } from "../managers/UserManager"
import { useParams } from "react-router-dom"
import { createSharedCalculatedRosterChoice } from "../managers/UserManager"


export const AddSharedRosterChoice = () => {
    const {rosterTokenId} = useParams()
    const [characters, setCharacters] = useState([])
  const [playerStats, setPlayerStats] = useState({
    character: 0,
    damage: 0,
    healing: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    group: 0,
  })

useEffect(() => {
    getUserCharacters().then(
        (data) => {
            setCharacters(data)
        }
    )
}, [localStorage.getItem("token")])

const handleChange = (e) => {
  e.preventDefault();
  const copy = {...playerStats}
  copy[e.target.name] = parseInt(e.target.value)
  setPlayerStats(copy)
}
const onSubmit = (e) => {
  e.preventDefault();
if (playerStats.character === 0) {
  window.alert("Please select a character")
  return
}
else {

  createSharedCalculatedRosterChoice(playerStats, rosterTokenId).then(
    (data) => {
      window.alert("Your stats have been added to the war board")
      window.location.href = `/profile`
    }
  )}
}

  return <>
   
    <div className="player__stuff">
      <div><h3>Add your Character information to an existing war board</h3><h4>You can assign a vod link on your character page after your stats have been entered.</h4></div>
      <form className="War--Statistics">
        <fieldset className="calculator--fieldset">


<select name='character' onChange={(e)=>{handleChange(e)}}><option key={0} id={0} value={0}>please select character</option>
{characters.map((c) => <option key={c.id} id={c.id} value={c?.id}  >{c?.character_name}</option>)}</select>



        <select onChange={(event) => { 
            handleChange(event)
          }} name="group"> <option value={0}>group</option>
  {Array.from({length: 10}, (_, i) => i + 1).map(num => (
    <option value={num}>{num}</option>
  ))}
</select>
        
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
          <button className="save--and--add" onClick={(click) => {onSubmit(click)}}>Save and Add</button>
          <br></br>
        </fieldset></form>
        <hr className="custom-line-break" />
        
    </div>
  </>
}

